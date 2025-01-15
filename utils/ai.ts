import { Mistral } from '@mistralai/mistralai'
import { z } from 'zod'

const apiKey = process.env.MISTRAL_API_KEY
const mistral = new Mistral({ apiKey: apiKey })

const allowedMoods = [
  'Excellent',
  'Great',
  'Good',
  'Neutral',
  'Poor',
  'Bad',
  'Terrible'
] as const

export const schema = z.object({
  summary: z.string()
    .min(50, "Summary should be at least 50 characters")
    .max(500, "Summary should not exceed 500 characters"),
  worth: z.number()
    .int()
    .min(1, "Worth should be between 1-10")
    .max(10, "Worth should be between 1-10"),
    overallMood: z.enum(allowedMoods, {
      description: "Mood must be one of the predefined values",
      required_error: "Mood is required",
      invalid_type_error: "Mood must be a string"
    }),
  stressLevel: z.number()
    .int()
    .min(1, "Stress level should be between 1-10")
    .max(10, "Stress level should be between 1-10"),
  color: z.string()
    .regex(/^#[0-9A-F]{6}$/i, "Color must be a valid hex code")
})

export const systemPrompt = `You are an AI travel analyst. Your task is to analyze travel experiences and provide structured insights.

RULES:
- Provide analysis in valid JSON format
- Summary must be 50-500 characters
- Worth is rated 1-10 (10 being best value)
- Mood must be ONE of: [Excellent, Great, Good, Neutral, Poor, Bad, Terrible]
- Stress is rated 1-10 (10 being most stressful)
- Color must be hex code (#FF0000 red for negative to #00FF00 green for positive)

Example Input:
"Our Paris trip was incredible! The Eiffel Tower was breathtaking at sunset. Local cafes were pricey but worth it. Metro was confusing at first but we got used to it. Had to deal with some pickpocket attempts near tourist spots."

Example Output:
{
  "summary": "Enchanting Paris experience with iconic views and authentic cafe culture. Navigation challenges and security concerns were present but manageable. High costs balanced by memorable experiences.",
  "worth": 7,
  "overallMood": "Great",
  "stressLevel": 6,
  "color": "#7FFF00"
}

Analyze the input considering:
1. Overall experience quality
2. Value for money
3. Emotional sentiment
4. Challenges faced
5. Notable highlights

Return ONLY valid JSON matching the format above.`

export const analyze = async (experience: string) => {
  try {
    const chatResponse = await mistral.chat.complete({
      model: 'mistral-large-latest',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: experience }
      ],
      temperature: 0.7,
      maxTokens: 500
    })

    const content = chatResponse.choices?.[0]?.message?.content
    if (!content) throw new Error('No response from AI')

    const analysis = JSON.parse(content)
    const validatedAnalysis = schema.parse(analysis)
    
    return validatedAnalysis
  } catch (error) {
    console.error('Analysis failed:', error)
    throw new Error('Failed to analyze trip experience')
  }
}