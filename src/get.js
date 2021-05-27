const fetch=require('node-fetch');


const get=async (url)=>{
const res={};
res.data=[];
try {
    const d=await fetch(url);
    res.data=await d.json();
    
} 
catch (error) {
    console.log(error.message);
    res.error=error.message;
}

return res;

}

module.exports={get}