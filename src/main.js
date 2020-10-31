"use strict"
const coursesUrl = 'http://localhost:8888/projectapi/course/read.php';
const workUrl = 'http://localhost:8888/projectapi/work/read.php';
const projectUrl = 'http://localhost:8888/projectapi/project/read.php';

window.addEventListener("load", getCoarses);
window.addEventListener("load", getWork);
window.addEventListener("load", getProject);

let courseList = document.getElementById("course-list");
let workList = document.getElementById("work-list");
let projectList = document.getElementById("project-list");

//get courses function
function getCoarses() {
    fetch(coursesUrl)
        .then((result) => result.json())
        .then(data => {
    let courses = data.records;
   courses.forEach(courses => {
       courseList.innerHTML +=
   `
        <div class="col-1">${courses.startdate}</div> <div class="col-5">${courses.university}<br>${courses.name}</div>
    `;
    })
})
}
//get work function
function getWork() {
    fetch(workUrl)
        .then((result) => result.json())
        .then(data => {
            let work = data.records;
            work.forEach(work => {
                workList.innerHTML +=
            `
            <div class="col-1"> ${work.startdate}</div> <div class="col-5">${work.workplace} - ${work.title}<br> ${work.workdesc}</div>
            `;
             })
         })
}
//get project function
function getProject() {
    fetch(projectUrl)
        .then((result) => result.json())
        .then(data => {
            let project = data.records;
            project.forEach(project => {
                projectList.innerHTML +=
            `
            <div class="col-3"><b>${project.title}</b><br>${project.description}<br> <a href="http://${project.url}" target="_blank">${project.url}</a></div><div class="col-3"><img src="../images/${project.img_url}" width="250" height="250"></div>
            `;
             })
         })
}