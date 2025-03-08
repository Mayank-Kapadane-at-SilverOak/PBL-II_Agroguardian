// function formatDate() {
//     const date = new Date();

//     // Options for formatting the day, month, and date
//     const dateOptions = { weekday: 'long', month: 'short', day: 'numeric' };
//     const formattedDate = date.toLocaleDateString('en-US', dateOptions);
//     console.log('formattedDate:', formattedDate);


//     // Options for formatting the time
//     const timeOptions = { hour: 'numeric', minute: '2-digit', hour12: true };
//     const formattedTime = date.toLocaleTimeString('en-US', timeOptions).toUpperCase();

//     return `${formattedDate} | ${formattedTime}`;
// }

// setInterval(() => {
//     let atime = document.getElementsByClassName('alert-time')[0];
//     atime.innerHTML = formatDate();
//     console.log(formatDate());
// }, 1000);
