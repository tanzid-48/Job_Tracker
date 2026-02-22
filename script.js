let interviewList = [];
let rejectedList = [];

let total = document.getElementById("total-count");
// console.log(total);
let interviewCount = document.getElementById("interview-count")
let rejectedCount = document.getElementById("rejected-count")
// console.log(interviewCount);

let allFilterBtn = document.getElementById("all-filter-button");
let interviewFilterBtn = document.getElementById("interview-filter-btn");
let rejectedFilterBtn = document.getElementById("rejected-filter-button");
// console.log(interviewFilterBtn)
// console.log(allFilterBtn)

let allCardSection = document.getElementById('all-cards');
let filterButtons = document.getElementById('filter-buttons');
// console.log(allCardSection);
let filtersSection = document.getElementById('filter-section');
let mainContainer = document.querySelector('main');
// console.log(mainContainer);

function toggleStyle(id) {
    // reset all buttons
    allFilterBtn.classList.remove('bg-blue-500', 'text-white');
    interviewFilterBtn.classList.remove('bg-blue-500', 'text-white');
    rejectedFilterBtn.classList.remove('bg-blue-500', 'text-white');

    allFilterBtn.classList.add('bg-gray-300', 'text-black');
    interviewFilterBtn.classList.add('bg-gray-300', 'text-black');
    rejectedFilterBtn.classList.add('bg-gray-300', 'text-black');

    // active button
    let activeBtn = document.getElementById(id);
    activeBtn.classList.remove('bg-gray-300', 'text-black');
    activeBtn.classList.add('bg-blue-500', 'text-white');


    if (id === "interview-filter-btn") {
        allCardSection.classList.remove("hidden");
        filtersSection.classList.add("hidden");
        renderInterview();
    } else if (id === "rejected-filter-button") {
        allCardSection.classList.remove("hidden");
        filtersSection.classList.add("hidden");
        renderRejected();
    } else if (id === "all-filter-button") {
        allCardSection.classList.remove("hidden");
        filtersSection.classList.add("hidden");
    }
}

// Calculated cardCount 

function calculatedCount() {

    // total card count
    total.innerText = allCardSection.children.length;
    // total-job
    let totalJob = document.getElementById('total-job');
    totalJob.innerText = allCardSection.children.length;

    // interview count
    interviewCount.innerText = interviewList.length;
    rejectedCount.innerText = rejectedList.length;
}
calculatedCount();

mainContainer.addEventListener('click', function (event) {

    let parentNode = event.target.closest('.card');
    console.log(parentNode);
    if (!parentNode) return;


    let jobTitle = parentNode.querySelector('.job-title').innerText;
    //    console.log(jobTitle)

    let jobType = parentNode.querySelector('.job-type').innerText;
    let jobInfo = parentNode.querySelector('.job-info').innerText;
    let jobP = parentNode.querySelector('.job-p').innerText;
   

    //  Interview Button Click
 if(event.target.classList.contains('interview-btn')){

    parentNode.querySelector('.status').innerText = "Interview";

    let cardInfo = {
        jobTitle,
        jobType,
        jobInfo,
        status: "Interview",
        jobP
    };
    //  exist check
    let JobExist = interviewList.find(item => item. jobTitle === jobTitle);
 if(!JobExist){
    interviewList.push(cardInfo);
 }
//  rejected theke remove

 rejectedList = rejectedList.filter(item => item. jobTitle !== jobTitle);

 calculatedCount();
 renderInterview();

//  rejected Button Click

 }else if (event.target.classList.contains('rejected-btn')){

     parentNode.querySelector('.status').innerText = "Rejected";

    let cardInfo = {
        jobTitle,
        jobType,
        jobInfo,
        status: "Rejected",
        jobP
    };
    //  exist check
    let JobExist = rejectedList.find(item => item. jobTitle === jobTitle);
 if(!JobExist){
    rejectedList.push(cardInfo);
 }
//  rejected theke remove

 interviewList = interviewList.filter(item => item. jobTitle !== jobTitle);

 calculatedCount();
 renderInterview();

 } else if(event.target.classList.contains('delete-btn')){
 
    parentNode.remove();

    interviewList = interviewList.filter(item => item.jobTitle !== jobTitle);
    rejectedList = rejectedList.filter(item => item.jobTitle !== jobTitle);
    calculatedCount();

 }

});
