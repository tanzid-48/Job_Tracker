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

        allCardSection.classList.add("hidden");
        filtersSection.classList.remove("hidden");

        renderInterview();
    } else if (id === "rejected-filter-button") {
        allCardSection.classList.add("hidden");
        filtersSection.classList.remove("hidden");
        renderRejected();
    } else {
        filtersSection.classList.add("hidden");
        allCardSection.classList.remove("hidden");
        filtersSection.innerHTML = '';

    }
}

// Calculated cardCount 

function calculatedCount() {

    // total card count
    total.innerText = allCardSection.children.length;
    // total-job
    let totalJob = document.getElementById('total-job');
    totalJob.innerText = allCardSection.children.length + " Jobs";

    if (allCardSection.children.length === 0) {
        allCardSection.innerHTML = `
            <div class="flex flex-col items-center justify-center py-16 text-center">
                <img src="jobs.png" class="w-20 mb-4">
                <h3 class="text-lg font-semibold text-gray-600">No jobs available</h3>
                <p class="text-gray-400 text-sm">Check back soon for new job opportunities</p>
            </div>
        `;
    }

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
    if (event.target.classList.contains('interview-btn')) {

        parentNode.querySelector('.status').innerText = "Interview";

        let cardInfo = {
            jobTitle,
            jobType,
            jobInfo,
            status: "Interview",
            jobP
        };
        //  exist check
        rejectedList = rejectedList.filter(item => item.jobTitle !== jobTitle);
        let exists = interviewList.find(item => item.jobTitle === jobTitle);
        if (!exists) {
            interviewList.push(cardInfo);
        }

        calculatedCount();
        renderInterview();

        //  rejected Button Click

    }
    else if (event.target.classList.contains('rejected-btn')) {

        parentNode.querySelector('.status').innerText = "Rejected";

        let cardInfo = {
            jobTitle,
            jobType,
            jobInfo,
            status: "Rejected",
            jobP
        };

        //  rejected theke remove

        interviewList = interviewList.filter(item => item.jobTitle !== jobTitle);
        //  exist check
        let exists = rejectedList.find(item => item.jobTitle === jobTitle);
        if (!exists) {
            rejectedList.push(cardInfo);
        }


        calculatedCount();
        renderRejected();
    }

    //  Delete Button Click


    else if (event.target.closest('.delete-btn')) {

        // filter section
        //       console.log("delete clicked");
        // console.log("jobTitle:", jobTitle);
        // console.log("parentNode:", parentNode);

        parentNode.remove();

        interviewList = interviewList.filter(item => item.jobTitle !== jobTitle);
        rejectedList = rejectedList.filter(item => item.jobTitle !== jobTitle);
        calculatedCount();

    }

});

function renderInterview() {

    filtersSection.innerHTML = '';


    if (interviewList.length === 0) {
        filtersSection.innerHTML = `
            <div class="flex flex-col items-center justify-center py-16 text-center">
                <img src="jobs.png" class="w-20 mb-4">
                <h3 class="text-lg font-semibold text-gray-600">No jobs available</h3>
                <p class="text-gray-400 text-sm">Check back soon for new job opportunities</p>
            </div>
        `;
        return;
    }

    for (let interview of interviewList) {

        let div = document.createElement('div');
        div.className = 'card  bg-white rounded-md shadow-2xl p-6 space-y-4'

        div.innerHTML = `

        <div class="flex justify-between flex-wrap">
                <div>
                    <p class="job-title font-semibold text-lg">
                        ${interview.jobTitle}
                    </p>
                    <p class="job-type text-gray-600">
                        ${interview.jobType}
                    </p>
                </div>

                <div>
                    <button class="delete-btn w-9 h-9 items-center rounded-full bg-gray-100">
                        <i class="fa-regular fa-trash-can"></i>
                    </button>
                </div>
            </div>

            <ul class="job-info flex gap-4 text-sm text-gray-500 flex-wrap">
                <li>${interview.jobInfo}</li>
            </ul>

            <div class="space-y-3">
                <span class="status inline-block px-3 py-1 text-sm bg-green-200 rounded-md">
                    ${interview.status}
                </span>

                <p class="job-p text-gray-600 text-sm">
                    ${interview.jobP}
                </p>
            </div>

            <div class="flex gap-4 flex-wrap">
                <button class="interview-btn text-green-500 border border-green-500 px-4 py-2 rounded-md hover:bg-green-50">
                    INTERVIEW
                </button>

                <button class="rejected-btn text-red-500 border border-red-500 px-4 py-2 rounded-md hover:bg-red-50">
                    REJECTED
                </button>
            </div>
        `
        filtersSection.appendChild(div)
    }
}


function renderRejected() {
    filtersSection.innerHTML = '';


    if (rejectedList.length === 0) {
        filtersSection.innerHTML = `
            <div class="flex flex-col items-center justify-center py-16 text-center">
                <img src="jobs.png" class="w-20 mb-4">
                <h3 class="text-lg font-semibold text-gray-600">No jobs available</h3>
                <p class="text-gray-400 text-sm">Check back soon for new job opportunities</p>
            </div>
        `;
        return;
    }

    for (let rejected of rejectedList) {

        let div = document.createElement('div');
        div.className = 'card bg-white rounded-md shadow-2xl p-6 space-y-4';

        div.innerHTML = `
            <div class="flex justify-between flex-wrap">
                <div>
                    <p class="job-title font-semibold text-lg">
                        ${rejected.jobTitle}
                    </p>
                    <p class="job-type text-gray-600">
                        ${rejected.jobType}
                    </p>
                </div>

                <div>
                    <button class="delete-btn w-9 h-9 items-center rounded-full bg-gray-100">
                        <i class="fa-regular fa-trash-can"></i>
                    </button>
                </div>
            </div>

            <ul class="job-info flex gap-4 text-sm text-gray-500 flex-wrap">
                <li>${rejected.jobInfo}</li>
            </ul>

            <div class="space-y-3">
                <span class="status inline-block px-3 py-1 text-sm bg-red-200 rounded-md">
                    ${rejected.status}
                </span>

                <p class="job-p text-gray-600 text-sm">
                    ${rejected.jobP}
                </p>
            </div>

            <div class="flex gap-4 flex-wrap">
                <button class="interview-btn text-green-500 border border-green-500 px-4 py-2 rounded-md hover:bg-green-50">
                    INTERVIEW
                </button>

                <button class="rejected-btn text-red-500 border border-red-500 px-4 py-2 rounded-md hover:bg-red-50">
                    REJECTED
                </button>
            </div>
        `;

        filtersSection.appendChild(div)
    }


}
