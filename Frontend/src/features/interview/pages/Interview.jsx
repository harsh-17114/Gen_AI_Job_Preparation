import { useState, useEffect } from "react"
import "../style/interview.scss"
import { useInterview } from "../hooks/useInterview.js"
import { useParams } from "react-router-dom"

// Define the navigation items displayed in the interview sidebar
const NAV_ITEMS = [
    {
        id: "technical", label: "Technical Questions", icon: (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
        </svg>)
    },
    {
        id: "behavioral", label: "Behavioral Questions", icon: (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>)
    },
    {
        id: "roadmap", label: "Road Map", icon: (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="3 11 22 2 13 21 11 13 3 11" />
        </svg>)
    },
]

// Component used to display an individual interview question
const QuestionCard = ({ item, index }) => {
    // Controls whether the question's answer/details are visible
    const [open, setOpen] = useState(false)

    return (
        <div className="q-card">

            {/* Question header that can be clicked to expand/collapse the card */}
            <div className="q-card__header" onClick={() => setOpen(o => !o)}>

                {/* Display question number */}
                <span className="q-card__index">Q{index + 1}</span>

                {/* Display the interview question */}
                <p className="q-card__question">{item.question}</p>

                {/* Display the expand/collapse arrow */}
                <span className={`q-card__chevron ${open ? "q-card__chevron--open" : ''}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="6 9 12 15 18 9" />
                    </svg>
                </span>
            </div>

            {/* Display question details when the card is expanded */}
            {open && (
                <div className="q-card__body">

                    {/* Interviewer's intention behind the question */}
                    <div className="q-card__section">
                        <span className="q-card__tag q-card__tag--intention">Intention</span>
                        <p>{item.intention}</p>
                    </div>

                    {/* Suggested/model answer for the question */}
                    <div className="q-card__section">
                        <span className="q-card__tag q-card__tag--answer">Model Answer</span>
                        <p>{item.answer}</p>
                    </div>
                </div>
            )}
        </div>
    )
}

// Component used to display one day of the preparation roadmap
const RoadMapDay = ({ day }) => (
    <div className="roadmap-day">

        {/* Display the day number and main focus */}
        <div className="roadmap-day__header">
            <span className="roadmap-day__badge">Day {day.day}</span>
            <h3 className="roadmap-day__focus">{day.focus}</h3>
        </div>

        {/* Display the tasks for this day */}
        <ul className="roadmap-day__tasks">
            {day.tasks.map((task, i) => (
                <li key={i}>
                    <span className="roadmap-day__bullet" />
                    {task}
                </li>
            ))}
        </ul>
    </div>
)

// Main interview page component
const Interview = () => {
    // Track which section is currently selected
    const [activeNav, setActiveNav] = useState("technical")

    // Get interview report and related functions from the custom hook
    const { report, getReportById, loading } = useInterview()

    // Get the interview ID from the URL
    const { interviewId } = useParams()

    // Fetch the interview report whenever the interview ID changes
    useEffect(() => {
        if (interviewId) {
            getReportById(interviewId)
        }
    }, [interviewId])

    // Display loading screen while the report is being fetched
    if (loading || !report) {
        return (
            <main className="loading-screen">
                <h1>Loading your interview plan...</h1>
            </main>
        )
    }

    // Determine the CSS class for the match score
    const scoreColor = report.matchScore >= 80 ? "score--high" : report.matchScore >= 60 ? "score--mid" : "score--low"

    return (
        <div className="interview-page">
            <div className="interview-layout">

                {/* Interview navigation sidebar */}
                <nav className="interview-nav">
                    <div className="nav-content">
                        <p className="interview-nav__label">Sections</p>

                        {/* Render all navigation items */}
                        {NAV_ITEMS.map(item => (
                            <button onClick={() => setActiveNav(item.id)}
                                className={`interview-nav__item ${activeNav === item.id ? "interview-nav__item--active" : ""}`}
                                key={item.id}>
                                <span className="interview-nav__icon">{item.icon}</span>
                                {item.label}
                            </button>
                        ))}
                    </div>
                </nav>
                <div className="interview-divider" />
                <main className="interview-content">
                    {/* Technical questions section */}
                    {activeNav === "technical" && (
                        <section>
                            <div className="content-header">
                                <h2>Technical Questions</h2>
                                <span className="content-header__count">{report.technicalQuestions.length} questions</span>
                            </div>
                            <div className="q-list">
                                {report.technicalQuestions.map((q, i) => (
                                    <QuestionCard key={i} item={q} index={i} />
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Behavioral questions section */}
                    {activeNav === "behavioral" && (
                        <section>
                            <div className="content-header">
                                <h2>Behavioral Questions</h2>
                                <span className="content-header__count">{report.behavioralQuestions.length} questions</span>
                            </div>
                            <div className="q-list">
                                {report.behavioralQuestions.map((q, i) => (
                                    <QuestionCard key={i} item={q} index={i} />
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Preparation roadmap section */}
                    {activeNav === "roadmap" && (
                        <section>
                            <div className="content-header">
                                <h2>Preparation Road Map</h2>
                                <span className="content-header__count">{report.preparationPlan.length}-day plan</span>
                            </div>
                            <div className="roadmap-list">
                                {report.preparationPlan.map((day) => (
                                    <RoadMapDay key={day.day} day={day} />
                                ))}
                            </div>
                        </section>
                    )}
                </main>
                <div className="interview-divider" />

                {/* Right sidebar containing match score and skill gaps */}
                <aside className="interview-sidebar">

                    {/* Match score section */}
                    <div className="match-score">
                        <p className="match-score__label">Match Score</p>
                        <div className={`match-score__ring ${scoreColor}`}>
                            <span className="match-score__value">{report.matchScore}</span>
                            <span className="match-score__pct">%</span>
                        </div>
                        <p className="match-score__sub">{report.matchScore >= 80 ? "Strong match for this role" : report.matchScore >= 60 ? "Moderate match for this role" : "Needs improvement for this role"}</p>
                    </div>
                    <div className="sidebar-divider" />

                    {/* Skill gaps section */}
                    <div className="skill-gaps">
                        <p className="skill-gaps__label">Skill Gaps</p>
                        <div className="skill-gaps__list">
                            {report.skillGaps.map((gap, i) => (
                                <span key={i} className={`skill-tag skill-tag--${gap.severity}`}>
                                    {gap.skill}
                                </span>
                            ))}
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    )
}

export default Interview