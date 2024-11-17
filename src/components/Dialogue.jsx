import { useState } from "react"
import { displayDialogue } from "../utils/utils";

export default function Dialogue({ title, description, question, answers }) {

    const [questionOptions, setQuestionsOptions] = useState([]);
    const [answersOptions, setAnswersOptions] = useState([]);


    return (
        <div className="dialogue-container absolute hidden">
            <div className=" flex flex-col flex-wrap justify-start items-start">
                <p className="title text-black" id="title">
                    FIRTS TEXT EXAMPLE OF THE DIALOGUE
                </p>
                <div className="description" id="description">
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quo voluptatum culpa vitae ipsum obcaecati ducimus perspiciatis, illo accusantium nemo at voluptate soluta quasi minus, dolorem, mollitia impedit accusamus? Natus, nisi.</p>
                </div>
                <div className="button-container" id="button-container">
                    <button className="btn-close">Close</button>
                </div>
            </div>

        </div>
    );
}