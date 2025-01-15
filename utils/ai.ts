import { Mistral } from '@mistralai/mistralai'
import { z } from 'zod'

const apiKey = process.env.MISTRAL_API_KEY
const mistral = new Mistral({ apiKey: apiKey })

interface TripExperience {
  title: string
  budget: number
  destination: string
  experience: string
  startDate: string
  endDate: string
}

export const analyze = async (experience: string) => {

  const allowedMoods = [
    'Excellent',
    'Great',
    'Good',
    'Neutral',
    'Poor',
    'Bad',
    'Terrible',
  ] as const
  
  const schema = z.object({
    summary: z
      .string()
      .min(50, 'Summary should be at least 50 characters')
      .max(500, 'Summary should not exceed 500 characters'),
    worth: z
      .boolean()
      .describe('Yes if worth it, No if not worth it'),
    overallMood: z.enum(allowedMoods, {
      description: 'Mood must be one of the predefined values',
      required_error: 'Mood is required',
      invalid_type_error: 'Mood must be a string',
    }),
    stressLevel: z
      .number()
      .int()
      .min(1, 'Stress level should be between 1-10')
      .max(10, 'Stress level should be between 1-10'),
    color: z.string().regex(/^#[0-9A-F]{6}$/i, 'Color must be a valid hex code'),
    sentimentScore: z
      .number()
      .int()
      .min(-10, 'Sentiment score should be between -10 and 10')
      .max(10, 'Sentiment score should be between -10 and 10')
      .describe('A score from -10 (extremely negative) to 10 (extremely positive)'),
  })

  const systemPrompt = 
    `You are an AI travel analyst. Your task is to analyze travel experiences and provide structured insights.

    RULES:
    - Provide analysis in valid JSON format
    - Summary must be 50-500 characters
    - Worth is a boolean (true if worth it, false if not worth it)
    - Mood must be ONE of: [Excellent, Great, Good, Neutral, Poor, Bad, Terrible]
    - Stress is rated 1-10 (10 being most stressful)
    - Color must be hex code (#FF0000 red for negative to #00FF00 green for positive, DO NOT EVER RETURN #000000 black or #FFFFFF white as they are used for text)
    - SentimentScore is rated -10 to 10 (-10 being extremely negative, 0 being neutral, 10 being extremely positive)

    Example Input:
    "Our Paris trip was incredible! The Eiffel Tower was breathtaking at sunset. Local cafes were pricey but worth it. Metro was confusing at first but we got used to it. Had to deal with some pickpocket attempts near tourist spots."

    Example Output:
    {
      "summary": "Enchanting Paris experience with iconic views and authentic cafe culture. Navigation challenges and security concerns were present but manageable. High costs balanced by memorable experiences.",
      "worth": true,
      "overallMood": "Great",
      "stressLevel": 6,
      "color": "#7FFF00",
      "sentimentScore": 8
    }

    Analyze the input considering:
    1. Overall experience quality
    2. Value for money
    3. Emotional sentiment and tone
    4. Challenges faced
    5. Notable highlights
    6. Balance of positive vs negative experiences

    Return ONLY valid JSON matching the format above.`

  try {
    const chatResponse = await mistral.chat.complete({
      model: 'mistral-large-latest',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: experience },
      ],
      temperature: 0.7,
      maxTokens: 500,
    })

    const content = chatResponse.choices?.[0]?.message?.content
    if (!content) throw new Error('No response from AI')
    debugger
    const analysis = JSON.parse(typeof content === 'string' ? content : JSON.stringify(content))
    const validatedAnalysis = schema.parse(analysis)

    return validatedAnalysis
  } catch (error) {
    console.error('Analysis failed:', error)
    throw new Error('Failed to analyze trip experience')
  }
}

export const qa = async (question: string, entries: TripExperience[]) => {
  const context = entries
    .map(entry => (
      `Trip: ${entry.title}
      Budget: ${entry.budget}
      Location: ${entry.destination}
      StartDate: ${entry.startDate}
      EndDate: ${entry.endDate}
      Experience: ${entry.experience}
      ---`
    ))
    .join('\n')

  const systemPrompt = 
    `You are a travel advisor analyzing multiple trip experiences.
    Use the provided trip experiences as context to answer user questions.
    Keep answers concise and relevant to the trips mentioned.
    If the answer cannot be found in the context, say "I cannot answer this based on your trips."

    Context: ${context}

    Question: ${question}

    Please provide an answer based only on the information available in the trip experiences.`

  try {
    const chatResponse = await mistral.chat.complete({
      model: 'mistral-large-latest',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: question }
      ],
      temperature: 0.7,
      maxTokens: 500
    })

    const answer = chatResponse.choices?.[0]?.message?.content
    if (!answer) throw new Error('No response from AI')

    return {
      answer,
      success: true
    }
  } catch (error) {
    console.error('Q&A failed:', error)
    return {
      answer: 'Sorry, I could not process your question at this time.',
      success: false
    }
  }
}

export const formatPlaces = async (places: unknown[]) => {
  const systemPrompt = `
    You are a location correction assistant. Format and correct destination names while preserving their meaning.

    Input Examples:
    - "Gia, India" -> "Goa, India"
    - "New Yrok, USA" -> "New York, USA"
    - "Phket, Thailand" -> "Phuket, Thailand"

    Rules:
    1. Maintain country name if provided
    2. Fix common spelling mistakes
    3. Use proper capitalization
    4. Remove extra spaces
    5. Keep format as "City, Country"
    6. If unsure, return original input

    Example Input:
    {
      id: "1",
      destination: "Gis, Indua",
      startDate: "2025-01-15"
    }

    Example Output:
    {
      id: "1",
      destination: "Goa, India",
      startDate: "2025-01-15",
      corrected: true
    }

    Please format the given destination name following these rules.`

    try {
      const chatResponse = await mistral.chat.complete({
        model: 'mistral-large-latest',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: JSON.stringify(places) }
        ],
        temperature: 0.7,
        maxTokens: 500
      })
  
      const content = chatResponse.choices?.[0]?.message?.content
      if (!content) throw new Error('No response from AI')
      
      // Clean and parse the response
      const cleanedContent = (content as string)
        .replace(/```json\n|\n```/g, '') // Remove markdown code blocks
        .trim()
      
      try {
        const parsedContent = JSON.parse(cleanedContent)
        console.log('Parsed content:', parsedContent)
        return parsedContent
      } catch (parseError) {
        console.error('JSON parse error:', parseError)
        throw new Error('Invalid JSON response from AI')
      }
  } catch (error) {
      console.error('Formatting places failed:', error)
      throw new Error('Failed to format destination')
  }
}