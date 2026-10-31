const { GoogleGenAI } = require("@google/genai")
const { z } = require("zod")
const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_GENAI_API_KEY })

// Define the structure of the interview report
// This schema is used to tell Gemini exactly what response format is expected
const interviewReportSchema = z.object({
    // Score between 0 and 100 showing how well the candidate
    // matches the requirements of the job
    matchScore: z.number().describe("A score between 0 and 100 indicating how well the candidate's profile matches the job describe"),

    // List of technical interview questions
    technicalQuestions: z.array(z.object({

        // Technical question that may be asked during the interview
        question: z.string().describe("The technical question can be asked in the interview"),

        // Explains why the interviewer might ask this question
        intention: z.string().describe("The intention of interviewer behind asking this question"),

        // Explains how the candidate should answer the question
        answer: z.string().describe("How to answer this question, what points to cover, what approach to take etc.")
    })).describe("Technical questions that can be asked in the interview along with their intention and how to answer them"),

    // List of behavioral interview questions
    behavioralQuestions: z.array(z.object({

        // Behavioral question that may be asked during the interview
        question: z.string().describe("The technical question can be asked in the interview"),

        // Explains the purpose behind the question
        intention: z.string().describe("The intention of interviewer behind asking this question"),

        // Provides guidance on how the candidate should answer
        answer: z.string().describe("How to answer this question, what points to cover, what approach to take etc.")
    })).describe("Behavioral questions that can be asked in the interview along with their intention and how to answer them"),

    // List of skills that the candidate needs to improve
    skillGaps: z.array(z.object({

        // Name of the missing or weak skill
        skill: z.string().describe("The skill which the candidate is lacking"),

        // Importance/severity of the skill gap
        severity: z.enum(["low", "medium", "high"]).describe("The severity of this skill gap, i.e. how important is this skill for the job and how much it can impact the candidate's chances")
    })).describe("List of skill gaps in the candidate's profile along with their severity"),

    // Day-by-day preparation plan for the candidate
    preparationPlan: z.array(z.object({

        // Day number in the preparation plan
        day: z.number().describe("The day number in the preparation plan, starting from 1"),

        // Main topic to focus on during that day
        focus: z.string().describe("The main focus of this day in the preparation plan, e.g. data structures, system design, mock interviews etc."),

        // List of tasks to complete during that day
        tasks: z.array(z.string()).describe("List of tasks to be done on this day to follow the preparation plan, e.g. read a specific book or article, solve a set of problems, watch a video etc.")
    })).describe("A day-wise preparation plan for the candidate to follow in order to prepare for the interview effectively"),

    // Job title for which the interview report is generated
    title: z.string().describe("The title of the job for which the interview report is generated"),
})

// Generate an interview report using the candidate's information
async function generateInterviewReport({ resume, selfDescription, jobDescription }) {
    // Create a prompt containing the candidate's information

    const prompt = `Generate an interview preparation report for the candidate based ONLY on the provided resume, self-description, and job description.

            Return ONLY the structured interview report requested by the response schema.

            The response MUST contain these fields:
            - technicalQuestions: an array of objects, each containing:
            - question: the technical interview question
            - intention: what the interviewer is evaluating
            - answer: a detailed sample answer

            - behavioralQuestions: an array of objects, each containing:
            - question: the behavioral interview question
            - intention: what the interviewer is evaluating
            - answer: a detailed sample answer

            - skillGaps: an array of objects, each containing:
            - skill: the skill the candidate needs to improve
            - severity: one of "low", "medium", or "high"

            - preparationPlan: an array of objects, each containing:
            - day: the preparation day number
            - focus: the main topic for that day
            - tasks: an array of specific preparation tasks

            IMPORTANT:
            - Do NOT generate a resume.
            - Do NOT return candidate_name.
            - Do NOT return contact_information.
            - Do NOT return education.
            - Do NOT return technical_skills.
            - Do NOT return professional_summary.
            - Do NOT return experience.
            - Do NOT return projects.
            - Do NOT return achievements.
            - The "title" field is REQUIRED.
            - If the job description contains a job title, use that title.
            - If the job title is not explicitly provided, infer a concise title from the job description.

            Resume:
            ${resume}

            Self Description:
            ${selfDescription}

            Job Description:
            ${jobDescription}
            `

    // Send the prompt to Gemini
    const response = await ai.models.generateContent({

        // Gemini model used for generating the report
        model: "gemini-3-flash-preview",

        // Prompt sent to the model
        contents: prompt,

        config: {
            responseMimeType: "application/json",
            responseSchema: {
                type: "object",
                properties: {
                    matchScore: {
                        type: "number",
                        minimum: 0,
                        maximum: 100
                    },
                    technicalQuestions: {
                        type: "array",
                        items: {
                            type: "object",
                            properties: {
                                question: { type: "string" },
                                intention: { type: "string" },
                                answer: { type: "string" }
                            },
                            required: ["question", "intention", "answer"]
                        }
                    },
                    behavioralQuestions: {
                        type: "array",
                        items: {
                            type: "object",
                            properties: {
                                question: { type: "string" },
                                intention: { type: "string" },
                                answer: { type: "string" }
                            },
                            required: ["question", "intention", "answer"]
                        }
                    },
                    skillGaps: {
                        type: "array",
                        items: {
                            type: "object",
                            properties: {
                                skill: { type: "string" },
                                severity: {
                                    type: "string",
                                    enum: ["low", "medium", "high"]
                                }
                            },
                            required: ["skill", "severity"]
                        }
                    },
                    preparationPlan: {
                        type: "array",
                        items: {
                            type: "object",
                            properties: {
                                day: { type: "number" },
                                focus: { type: "string" },
                                tasks: {
                                    type: "array",
                                    items: { type: "string" }
                                }
                            },
                            required: ["day", "focus", "tasks"]
                        }
                    },
                    title: {
                        type: "string"
                    }
                },
                required: [
                    "matchScore",
                    "technicalQuestions",
                    "behavioralQuestions",
                    "skillGaps",
                    "preparationPlan",
                    "title"
                ]
            }
        }
    })

    // Convert Gemini's JSON response from a string into a JavaScript object and return it
    return JSON.parse(response.text)
}

module.exports = { generateInterviewReport }