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
// console.log(allCardSection);
let filtersSection = document.getElementById('filter-section');
let mainContainer = document.querySelector('main');
console.log(mainContainer);

 function toggleStyle(id){
    // inactive all first
        allFilterBtn.classList.remove('bg-black', 'text-white');
        interviewFilterBtn.classList.remove('bg-black', 'text-white');
        rejectedFilterBtn.classList.remove('bg-black', 'text-white');

        allFilterBtn.classList.add('bg-blue-500', 'text-white');
        interviewFilterBtn.classList.add('bg-blue-500', 'text-white');
        rejectedFilterBtn.classList.add('bg-blue-500', 'text-white');

        // after click active the button
      let activeBtn = document.getElementById(id);
         activeBtn.classList.remove('bg-gray-300', 'text-black');
    activeBtn.classList.add('bg-blue-500', 'text-white');

    if(id === "interview-filter-btn"){

        allCardSection.classList.remove("hidden");
        filtersSection.classList.add("hidden");
        renderInterview();
        
    }else if (id === "rejected-filter-button"){

        allCardSection.classList.remove("hidden");
        filtersSection.classList.add("hidden");
        renderRejected();

    }else if (id === "all-filter-button"){
        allCardSection.classList.remove("hidden");
        filtersSection.classList.add("hidden");
    }
 }

   // Calculated cardCount 

    function calculatedCount(){
        total.innerText = allCardSection.children.length;
        interviewCount.innerText = interviewList.length;
        rejectedCount.innerText = rejectedList.length;
    }
    calculatedCount();

    