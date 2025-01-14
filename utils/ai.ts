import { Mistral } from '@mistralai/mistralai'
import { z } from 'zod'

const apiKey = process.env.MISTRAL_API_KEY
const mistral = new Mistral({ apiKey: apiKey })

export const schema = z.object({
  summary: z.string()
    .min(50, "Summary should be at least 50 characters")
    .max(500, "Summary should not exceed 500 characters"),
  worth: z.number()
    .int()
    .min(1, "Worth should be between 1-10")
    .max(10, "Worth should be between 1-10"),
  overallMood: z.number()
    .int()
    .min(1, "Mood should be between 1-10")
    .max(10, "Mood should be between 1-10"),
  stressLevel: z.number()
    .int()
    .min(1, "Stress level should be between 1-10")
    .max(10, "Stress level should be between 1-10"),
  color: z.string()
    .regex(/^#[0-9A-F]{6}$/i, "Color must be a valid hex code")
})

export const systemPrompt = `You are an AI travel analyst. Analyze trip experiences and generate insights.
Based on the user's trip experience, generate:

1. A concise summary (50-500 chars)
2. Worth rating (1-10, where 10 is excellent value)
3. Overall mood (1-10, where 10 is extremely positive)
4. Stress level (1-10, where 10 is highly stressful)
5. A color in hex code representing the overall mood (#FF0000 for negative to #00FF00 for positive)

Example Input:
"Had an amazing time in Bali! The beaches were pristine and locals were friendly. Food was cheap and delicious. Only downside was the crowded tourist spots and slight overspending on activities."

Example Output:
{
  "summary": "Memorable Bali trip with beautiful beaches and friendly locals. Great food scene and reasonable prices, though tourist areas were crowded. Activities slightly exceeded budget but added value to experience.",
  "worth": 8,
  "overallMood": 9,
  "stressLevel": 4,
  "color": "#2ECC71"
}

Format your response as valid JSON matching this schema. Consider cost, experiences, challenges, and emotional tone in your analysis.`

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