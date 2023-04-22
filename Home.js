import  {  useState } from 'react'
import './Style.css'
import React from 'react'
import { useEffect } from 'react'
import axios from 'axios'

 
function Home() {

 const [data,setData] = useState({

    celcius:10,
    name:'london',
    humidity:10,
    speed:2,
    image:''
 })

 const [name,setName] = useState('');
 const [error,setError] = useState('');

//  useEffect(() =>{
//  },[])
 
 const handleClick =() =>{

    if(name !== ""){
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=4b31b6b57cf33a1aafb74d877df88645&&units=metric`;
        axios.get(apiUrl)
        
        .then(res =>{

        
            let imagePath = '';

            if(res.data.weather[0].main == "Clouds"){
                imagePath = "https://static.vecteezy.com/system/resources/previews/012/595/156/original/realistic-white-cloud-free-png.png"
            }
            else if(res.data.weather[0].main == "Clear"){
                imagePath = "https://www.transparentpng.com/thumb/sky/29B121-new-the-cooling-shelf-products-exquisa.png"
            }
            else if(res.data.weather[0].main == "Mist"){
                imagePath = "https://freepngimg.com/save/28000-mist-transparent-image/1279x737"
            }
            else if(res.data.weather[0].main == "Rain"){
                imagePath = "https://static.vecteezy.com/system/resources/previews/012/806/415/original/3d-cartoon-weather-rain-clouds-with-thunderstorm-dark-cloud-sign-with-lightning-isolated-on-transparent-background-3d-render-illustration-png.png"
            }
            else if(res.data.weather[0].main == "Drizzle"){
                imagePath = "https://png.pngtree.com/png-clipart/20220605/original/pngtree-drizzle-rain-cloud-vector-cute-design-kid-png-image_7963947.png"
            }
            else{
                imagePath ="https://www.nextpathway.com/hubfs/nextPathway_assets_2023/images/pages/home/Crop-Clous-covers.png"
            }


    
            setData({...data, celcius:res.data.main.temp, name:res.data.name, 
                humidity:res.data.main.humidity, speed:res.data.wind.speed,image:imagePath})
                setError('');
    
        })

        .catch(err=>{

            if(err.response.status ==404){
                setError('Invalid City Name')
            }else{
                setError('');
            }
            console.log(err)
        })

    }
 }
 






  return (
    <div className='container'>
        <div className='weather'>
            <div className='search'>
                <input type='text' placeholder='Enter City Name' onChange={e=>setName(e.target.value)}/>
                <button ><img src='/images/search.png' onClick={handleClick} alt=''/></button>
            </div>
         
         <div className='error'>
            <p>{error}</p>

         </div>


        <div className='winfo'>
            <img src={data.image} alt='' width="200px" className='icon'/>
            <h1>{Math.round(data.celcius)}°C</h1>
            <h2>{data.name}</h2>


            <div className='details'>
                <div className='col'>
             <img src='https://icons.veryicon.com/png/Object/Service%20Categories/Humidity.png' alt='' width="100px"/>
             <div className='humidity'>
                <p>{Math.round(data.humidity)}%</p>
                <p>Humidity</p>
             </div>


                </div>
                <div className='col'>
                <img src='https://www.pngall.com/wp-content/uploads/5/Wind-PNG-Free-Image.png' alt='' width="100px"/>
             <div className='wind'>
                <p>{Math.round(data.wind)}Km/h</p>
                <p>2 wind</p>

                </div>

            </div>

        </div>

        </div>
      
    </div>
    </div>
  )
}

export default Home;
