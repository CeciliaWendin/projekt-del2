"use strict"
const coursesUrl = 'http://localhost:8888/projekt-del1/courses.api.php';

window.addEventListener("load", getCoarses);

//get function
function getCoarses() {
    fetch(coursesUrl)
        .then((result) => result.json())
        .then(data => {
    console.log("data", data);
    let output = '';
    let courses = data.data;
    for(let i in courses) {
        output += `<ul>
        <li>${courses[i].university}: ${courses[i].name}, ${courses[i].startdate}–${courses[i].enddate}</li>
        </ul>`;
    }
    document.getElementById('course-list').innerHTML = output;
}).catch(error => console.log(error));
}