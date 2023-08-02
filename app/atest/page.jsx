import { jsonrepair } from "jsonrepair"

export default function Test() {

    const myfunction = () => {
        let text = `{"01.08":
        {"19:00-19:30": "Read similar tasks and check if they are relevant for you and valid for your goals", "19:30-20:00": "Keep looking for advancements. You should always inquire about new possibilities and ways to Discover advance potential challenges. Don't limit yourself/", "20:00-21:30": "Take some time to experiment. Learning highly creative subjects may require more relaxed or "playful" moods ", "21:30-23:00": "Believe in yourself. Improve by breaking out of confort zone and try out innovative approaches"},
        "02.08":
        {"07:00-07:30": "Potential is similar to a rough list of ideas. A potential can be fully boiled down when converging to the solid explanation ", "07:30-08:00": "Belive got success and persist in achieving your goals. ", "08:00-09:00": "Start with fresh perspective, simple and neat answers in complex matters. ", "09:00-10:00": "Positive attitude tries solutions finding rather than purpose avoiding .", "17:00-17:30": "Develop methodical compare & contrast approaches developing resourceful evaluation.", "17:30-18:00": "Self-reflection will bring satisfactory route clarifying obstacles blaming obaction.", "18:00-19:00": "Faith in concepts Let your own revision proceed decisions compromising over uncertainty.", "19:00-20:00": "Data orientd plan with preparation preades of practice disciplined with limitationx.", "20:00-21:00": "Polygressive aggesolve condition trusting own findings instead of single opintered course driving.","21:00-23:00": "Bear mind adjustments for misinterpretation woth reconsidering source upon misjudgment correcting effects."},
        "03.08":
        {"07:00-07:30": "Ultimate success claimed by repetitive prudemnce considering into conception of gradual progress learnt through exploration", "07:30-08:00": "Rebuild confidents paired off belief once satisfied made statements to purpose", "08:00-09:00": "Refrsh your knowledge does give benefit gain quick and intvea access for guided short.", "09:00-09:30": "Enthusiasm sustain if decline proceed strengthen with disciplined force adherence. ", "09:30-10:00": "Common bonds paraed approach improved with social factor enhances.", "12:00-12:30": "complexity hidden owhich ovcause steps to identify solutions.", "12:30-13:00": "Soft challenge little habits creatinf training methodology sometimes succeeds are overlooked" "13:00-14:00": "Improve experimentation skills new controlls viewed in wider concept given best rendition, when elements forced linearity.", "15:00-15:30": "In idea creavites, find potent ideas identify all presented points overlapping notion creare combine formation assessing.", "15:30-17:00": "Phstrasibe together making measure respecting what benefit could awrdstour forming prior visions obrestasries ", "17:00-17:30": "Seek future capabilities evaluating what further possible apirs your vision process reaching maxim plenitude possible."}}`
        console.log(jsonrepair(text))
    }

    return <>
        <button onClick={myfunction()} className="px-5 py-3 bg-pink-200">
            tap
        </button>
    </>
}