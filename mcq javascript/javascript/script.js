const start_btn = document.querySelector(".start_btn button");
const info_box = document.querySelector(".info_box");
const exit_btn = info_box.querySelector(".buttons .quit");
const continue_btn = info_box.querySelector(".buttons .Restart");
const quiz_box = document.querySelector(".quiz_box");

const option_list = document.querySelector(".option_list");
let seconds = 00;
let output;


start_btn.onclick = () => {
    info_box.classList.add("activeInfo");
}

exit_btn.onclick = () => {
    info_box.classList.remove("activeInfo");
}

continue_btn.onclick = () => {
    info_box.classList.remove("activeInfo")
    quiz_box.classList.add("activequiz");
    showQuestions(0);
    quecounter(1);
    setInterval(displayTime, 1000)
}

function displayTime() {
    seconds++;
    let hrs = Math.floor(seconds / 3600)
    let min = Math.floor(seconds / 60) - (hrs * 60)
    let sec = Math.floor(seconds % 60)
    output = hrs.toString().padStart(2, '0') + ":" +
        min.toString().padStart(2, '0') + ":" +
        sec.toString().padStart(2, '0');
    const time = quiz_box.querySelector(".time");
    time.innerHTML = output;
}


let que_count = 0;
let que_numb = 1;
let userScore = 0;

const next_btn = quiz_box.querySelector(".next_button");
const result_box = document.querySelector(".result_box");
const quit_quiz = result_box.querySelector(".buttons .quit");

quit_quiz.onclick = () => {
    window.location.reload();
}


next_btn.onclick = () => {
    if (que_count < questions.length - 1) {

        que_count++;
        que_numb++;
        showQuestions(que_count);
        quecounter(que_numb);

    }
    else {
        showResultBox();
    }
}

function showQuestions(index) {
    const que_text = document.querySelector(".que_text");
    let que_tag = '<span>' + questions[index].numb + "." + questions[index].question + '</span>';
    let option_tag = '<div class="option"> ' + questions[index].options[0] + '<span></span></div>'
        + ' <div class="option">' + questions[index].options[1] + '<span></span></div>'
        + '<div class="option">' + questions[index].options[2] + '<span></span></div>'
        + '<div class="option">' + questions[index].options[3] + '<span></span></div>';
    que_text.innerHTML = que_tag;
    option_list.innerHTML = option_tag;
    const option = option_list.querySelectorAll(".option");
    for (let i = 0; i < option.length; i++) {
        option[i].setAttribute("onclick", "optionSelected(this)");

    }
}

function optionSelected(answer) {
    let userAnswer = answer.textContent;
    let userAns = userAnswer.trim();
    let correctAns = questions[que_count].answer;
    const allOptions = option_list.children.length;
    if (userAns == correctAns) {
        userScore += 1;
        answer.classList.add("correct");
    }
    else {
        answer.classList.add("incorrect");
        for (let i = 0; i < allOptions; i++) {
            if (option_list.children[i].textContent.trim() == correctAns) {
                option_list.children[i].setAttribute("class", "option correct");

            }
        }
    }

    for (i = 0; i < allOptions; i++) {
        option_list.children[i].classList.add("disabled")

    }


}

function showResultBox() {
    let timeMsg;
    const timeText = result_box.querySelector(".timer");

    var firstInd = output.indexOf(':');
    var min = output.slice(firstInd + 1, -3);

    var lastInd = output.lastIndexOf(":");
    var sec = output.slice(lastInd + 1);

    if (min > 0) {
        timeMsg = '<span>  You spent ' + min + ' Min' + ' ' + sec + 'Sec for completing the quiz</span>';

    } else {
        timeMsg = '<span>  You spent ' + sec + 'Sec for completing the quiz</span>';

    }

    timeText.innerHTML = timeMsg;


    info_box.classList.remove("activeInfo");
    quiz_box.classList.remove("activequiz");
    result_box.classList.add("activeResult");
    const scoreText = result_box.querySelector(".score_text");
    const messageText = result_box.querySelector(".pass");

    if (userScore > 5) {
        let message = '<span>  You are successfully completed the quiz</span>';
        messageText.innerHTML = message;
    } else {
        let message = '<span>  Oops!! You have failed the quiz</span>';
        messageText.innerHTML = message;
    }
    if (userScore > 0) {

        let scoreTag = '<span>  You got' + userScore + 'out of' + questions.length + '</span>';
        scoreText.innerHTML = scoreTag;
    }

}


function quecounter(index) {
    const bottom_ques_counter = quiz_box.querySelector(".total_ques");
    let totalquescountTag = '<span><p>' + index + '</p><p> / </p>' + questions.length + '<p> questions</p></span> ';
    bottom_ques_counter.innerHTML = totalquescountTag;
}
