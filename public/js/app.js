console.log('Client Side Javscript file is loaded');


const weatherForm=document.querySelector('form');
const search=document.querySelector('input');
const messageOne=document.querySelector('#message-1')
const messagetwo=document.querySelector('#message-2')

// messageOne.textContent='from javascript';


weatherForm.addEventListener('submit',(event)=>{
    event.preventDefault()//prevent refresh of browser
    const location_data=search.value;
    if(location_data=='?')
    {
        messageOne.textContent='Unable to find the location. Try another search';
        messagetwo.textContent='';
    }else{
        const loc_url=`http://localhost:3000/weather?address=${location_data}`
        messageOne.textContent='Loading.....';
        messagetwo.textContent='';
        fetch(loc_url).then((response)=>{
        response.json().then((data)=>{
            // console.log(data);
            if(data.error){
                messageOne.textContent=data.error
                messagetwo.textContent='';
                // console.log(data.error);
            }else{
                messageOne.textContent=data.location;
                messagetwo.textContent=data.Information;
                // console.log(data.location);
                // console.log(data.Information);
            }
            
        })
    })
    }
    
    // console.log(location_data);
    // console.log('testing');
})



// fetch('https://puzzle.mead.io/puzzle').then((response)=>{
//     response.json().then((data)=>{
//         console.log(data);
//     })
// })