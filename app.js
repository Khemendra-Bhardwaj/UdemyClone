const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose')
const {User } = require('./model/User')
const {AllCourses} = require('./model//GlobalCourses')
const {MyCourses} = require('./model/UserCourses')

let  userName;  // used Later for finding User Courses 

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.set('view engine', 'pug')
app.use(express.static('public'));
 
// load From Database before rendering  --Global Same For All 
// const cards = [
//     {
//       image: 'data:image/jpeg;base64,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',
//       description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
//     },
//     {
//       image: 'data:image/jpeg;base64,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',
//       description: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
//     },
//     {
//         image: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAHsAxgMBIgACEQEDEQH/xAAbAAABBQEBAAAAAAAAAAAAAAAEAAECAwUGB//EAEIQAAICAQIDBQUDBwoHAAAAAAECAAMRBCESMUEFEyJRYQYUMnHhgZGSQmKTobHB0RUWIzNEUlSCg6I0Q1Nzo/Dx/8QAGgEAAwEBAQEAAAAAAAAAAAAAAQIDAAQFBv/EACcRAAICAQQCAgICAwAAAAAAAAABAgMRBBIhMRNRQVIUIhVhBTKh/9oADAMBAAIRAxEAPwDyApbX4WBxJ0jgfiK5HUGFGyjUjZEQ/mk4gjEo5wCVHQyyLyiovKeS1KkL+NgoPIy4mtRw5bA2BMGSxSDkDHkTiWqzOmCBg9ZmhoySRP3dLc8PCT6QazTPUxwwI9DmE0q+T3fhPl5yb2ux4b1Qnz4YMMLjCSz8gSLk8WckS88JbiYAA8yBGdF4x3YjqjFgMGOTSaLiK+HhrJ4SNyYBYpDcpqPU+nUHAIIziUjhfnhc8oEik4Z4fDIaKjv62QfEASvrIWOyHu8Sal6v6skEHII6S6jS2aks/XH65hVHKSXZXpwUs9Ocs1NAyzJvkcW0mCjfCMNtsYbraK0IFfMqOvKB9l4V5g/6Ma8qzcQBB6ydYDqRJWUkhttx+uNUOFhnkOcY58NMGsGcSC5zgQ16wyZHnBkH9JiFE5xwx7FA+cgRkGTc+KJl4RiMKygjw+ssrThHEecQGWEIY1KmFHi6mYCQN3ZsbDbZPWH2uKahUvItnb0EEQHdwcFd8ySZcAnOwwMxWh4PHQPw8TEnzilrUOwyNoouTbX6KShXYnIk1DLvgkR0IxjpLhw92RgZ6HEJks9DohdSVG3WSTKZA5HnI12lRwgwmgC3OeYGeUBeKT6J1plQ/SNYqNYBnaMzcK4HKTrAdCeogLcP9SC6UhwwIIl6lVcEJkiW13IGGV26yTV5tDL8J8ouSqrWMxGro7w4sbfoCf1RtVpagq93s3z5GXMvEAwIBjIii0d6fiGfthyO4LGAWukuoa1SByzLNSwqUV0DIwM+k0NQi2VIiggVnf8AOz1gttDPSSR4s4wDMpGlS4r9RUaZW0tup52KNlHmeslTWtiMrk8Qi0a2JYhsBAPhI8xDm06Jl/iUrsRBJlKq00n6MULjUDPwBo1+mAd2TZc7iaXu66itiiABVOCDBdUH4ALlwwHNeohTITqxF5BAF7orjeA44WZpqsqrwsd8jB9IJqFGdhsesddnNbXwB1rxNxHpHsBZiZp3aPuNBUxXDsST8oCEy4B6xlJMjOmUOJAx2jCEX1itysglZOTGIuOGLnXwjmRt98mFwF5/EcCOqFVJxnOwAl1gWvTJk+Jh9oiSeC9cc9gerVq34SdxFIXPxkekeIJKUckQpHSWSCFhLAUPxDB9JTAEJdziE01sGO+PPPlKlTJHC2QYRW5ZeFwMqMK3kPKZopBJMe6txWGIyPMSupiDjOx6QxdUKquALgkYbOCCPuldlCWDvdM2PMRcey7SbzFllRRl/O6wrT3cNoIUFeuZl8XAwyM46jaGaG9d9yM8hFcOC1VyTww7VgVvS9ahkPrzl4WnUswL4IUYGN4Je/eJjIJ6mNTqfd1J4Vf87G8Xa8HV5ob3noLI9z5gnbrJangbTG2o7HHhHSDaTVpfdw37qdjn9s1PdlOnZajmsjGx5+USWYvkvW1ZF7OgWqgajSpwb8R58iJKqq2niS05Qnp5xtFSWUi5bAE/KTqYe16tW3d1l1ByTseEdYJNjwhFrMuzG01j1WW0r4snZMfsj9pKWUApwMR8Gc8MK7ittallavaW/utjeX6zTG+tjWrbHxBhyjSkspkY1OUJRRz5cllCjHQ7SrUVsoBIO58ocNM1RUv4CZK0C7AyQVHWUUjklS8c9hPbqg0afhGAUH7BMfC01s7fH+SCJtW1m/T6XJywGD6Ymd2hpzjDZ8x6xKuI4K66LlNz/pGSw42J55lhqwNpNECHeJ33OJeUsHmRrzyyusNXYrlsLy9ZXqrTYdvh6STcTfKVssHfYsspbUDFcx5Nl32imI7WS4fSOFmh7r6Re678ptyL+JgIUy1eLGOcL92PlJDTnyjKSCq2gYliuI1YZCeE4zDl0/pJDS+k25B8cuwIDOx5RFTyEP8AdfSS919IdyD45MCqd6zt1l1Z4+LiXBx0k71roXitZUHqZlt2qgJ7qtiOhJ5xXJIG7b2FhDWQQeucTZ7LufjD12MHG2/LE5O/tTUW/Bw1DyXnBvetVzF9oz5MRJzsTWA1XuuWYnedr6mt7C9BKMRuR1mVRq7dNZkHiXqp5GcwbtQVUd/bheQ4zt+uONVqFYf09mQMDeLGcUsYHs1M5S3dHUJqbadSLKwc5z4ZuHtTgpZ9QFyw2A2OfnOEp7U1CYDBWI68jD9P2rTbaFtzWP77HIEMtkux6NXKGeezqtLr9LrgNJfTxE8mGxEp1PZhpszUCVPLPP7oFXp8gWVPxDmGWa+i1zgLXqhxjPPGSJKS28w6PSptVnF3fsEvpbTadN1V2OBvz88TN1pPd1htmxkZPIToNdpn1z1NXgrWfFvzGZidpU2re5ZAQNs56ScLc8FtRp+G10Y9+zbCJKHZOMjbzlgCtZ424R6wplFqBQ3DWOko5HnwpTy2AFD0MgycPPcw6wVoMICT5mCFLLG2GI6kRnXjgHI8hHl7UlebRQEdp0Kab0lg03pDAm0QSS3s9VUoE919JJdKPKHBZMLBvYypiAjSb8pamkHlDkTMvrQRXax1TEAGhB6SfuAA3E1kQAcpTrqV1Omt0zMyrYpUlTgiKrXkZ1RSykeVdqGzWdrX92CQG4RnbAlNOlFjqpuVctwkYPh+c6Htf2Vs0Glo91FupZjizgXbHrMuzS3uEZ9HwVheJSKj48/3snyl1LJ89OqcZvcuQT3GwDiXxDoRuD8pfp9E7g4Un5dIZW9mnuNNvC2PyePltsM+mR850PYOmXU2cRKF9uEMNjv6/P8AbI22bUdml03k7ObfspxWpGSx6BTA79JYrkBceHOPSeta/wBktVotCNTeuaEB7vjwQc88+U4ftEV6XVFVAtrycg+HiHzHykq7svDL26WG3MHk5ttAyb3OtakEqTjxYlPcFzwo4Ztzjyh9gv1jAcHfYOMVKcD1xEOze0HrNadn2kBiqN3J4iefP/0TqUkeXKt/CDPY69q9ZdpGGzAYGRzHPnvOxGjHNwfQCcx7P+y3aNmvp1Ovpaiqo8QHF4mP7p33dbHKfKJKzD4PV0lc/FiaAtPpdUQO6yEU7E7QTtPsc2IeO4A+c6KyzvNN3YArIHMCZd+jqzxPeWPkWGJy2XSz6PX01UGsyeTl7tBRSAlaksBux5mULU3RGKDoPpOis01G5VN+pLCNXRjeuqv8WZo3ccj2aeOf0RgnRX2fDT98l/I+p4TkcI8sYnSKblGRwfYZRqPeHBzaix1qCEtGnyzmLezHU4ZoofqtMzN4tQufQRSquOGWleejMHtS3+DH6X6SS+1T/wCDH6X6TmxJCdXjj6PIWqt9nSfzpf8Awa/pfpJD2os6aRf0n0nNjnLBN44+h1qrfsdIntVaP7Gv4z/CX1+1tw/sSfjP8JzCy1DiHww9DrVXfY6pfbG/l7jX+M/wkl9prnbPua/iM5pGPnC6bMRXRD0XhqbG+WdJX7Q3Ef8ABp+Iy2vte0tk6VfvMx6bTgY2HyhKXAnH7SJN1xXwdsLFLtmjZZp9a/Fq9BVYxXGSTt8vKaPYuk0enrGKMtseMtuD5iYXf8LLvv5TR0+uRFyXQfPac1sE1g664w9HTN7T/wAre9dmXLmrSMq88cZPLP3TC1un7OfUG23QI+Dshbw/X7czB7D7RT+cHa5Ljhtesrk89jNx9SjjawSMKsS5NRGpweF7Jr2xVpk4Kuz0CD8lGA/dKj7UCs5HZwP+p9IFqbMf/YBZqBvgj7xOqNMJfBKxxh1wat/tcWYn+T8f6n0gj+2TLy7P/wDJ9Jlai0cjz9R/CZtz77iVjpq/RxWaqS6Zuaj2xtsGF0YUf9z6QJ/aq4/2b/f9Jju0oYxvxKfRH+R1Ef8AWX/EbLe01uc+7gf5vpIn2ou5dxn5v9Jhsd5BvWD8Wr0J/Jan7G2faa7/AKH+/wCkpf2jvP8AyB+P6THIkCBCtNWvgSX+R1P2NR+3Lif6oD7fpFMoxo3gh6I/naj7DxwZAR8gSpyFgMkDBzeq7DcyDahjywIu5BTDQxlgbHUfsmU1jtzYmR+2DeHebK3qvNwP80ur1lPW1PvEwIpt4ysZ1C6+hBtdXn7P3SNnbyU7Vg2H9U5sbiKK5ZKq+a6NTVduaq8+E92vkDnMDbUWP8TsfmTB4omAO2b7ZeLT0bHykl1d1T8Vd1ikeTQaKDCBvkujXp9odcgAscWjzYDMKXt5LR/SZRvlxTntooy46G89nyzoW7S07crPv2lDaynpYv3zD6xR1Nk3a2ax1FZ5WL98ibVPJwftmXFD5BNzNIknlvInMADMOTESa3uuxwZt6NkKJkTK1uDc9jJcQPIiOmmDI+YpEx5gFBsMiSTzO0aKRyYUUUUBhRRRTGFFFFMYWY4MaITBTJRRCKYYUWYjIzAbFFmKKYUUUUUxhRRRTGFFFFMYUfJjRTGJcZHWKRimyzH/2Q==',
//         description: 'dummy testing data '
//     }
//   ];
  // load From User DataBase 
// const myCourses = [
//     {
//         image: 'data:image/jpeg;base64,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',
//         description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
//         price:10 
//     }
// ]


/*----------------------------  ROUTES ----------------------------------- */


/* -------------AddCourse--------------- */

app.get('/add-course', (req,res)=>{
    res.render('addCourse') 
})

app.post('/add-course', async (req,res)=>{
    const newCourse = {
        image: req.body.add_course_image,
        description : req.body.add_course_description,
        price : req.body.add_course_price
    }
    const newAddCourse = new AllCourses( newCourse )
    await newAddCourse.save() 
    console.log('new course added ');
    res.redirect('/dashboard') 
})
/* ------------------------AddCourse------------------------ */

/*----------------------Login ------------------------------ */
app.get('/login',(req,res)=>{
    res.render('login') 
})

app.post('/login',async (req,res)=>{
    const existingUser =  await User.findOne({name:req.body.name} )
    if(!existingUser){
        console.log('UserName Doesnt Exist') ;
    }
    else{
        const userPassword  = await existingUser.password
        if(userPassword === req.body.password){
            userName = req.body.name 
            res.redirect('/dashboard' )
        }
        else{
            console.log('Wrong Password ');
            res.redirect('/login')
        }
    }
})

/*----------------------Login ------------------------------ */




/* ------------------DashBoard ----------------------- */
app.get('/dashboard', async  (req,res)=>{

    const all_courses_available = []
    const courses = await AllCourses.find()
    // console.log(courses);
    for (let  course of courses) {
        all_courses_available.push(  
            {
                image: course.image ,
                description : course.description ,
                price : course.price 
            }
        )
    }
    // console.log(all_courses_available);
    res.render('dashboard', {all_courses_available} )
})

app.post('/dashboard', async (req,res)=>{
    // const enrolledCoursedIds = []
    const enrolledCourse = JSON.parse(req.body.course);
    // console.log(enrolledCourse);  
    // setting image as id 
    // no 2 courses can have same image id 
    // if(!enrolledCoursedIds.includes(enrolledCourse.image) ){
        // enrolledCoursedIds.push(enrolledCourse.image); // Add the ID to the list
        const myNewPurchasedCourse = {
            userName : userName , 
            image: enrolledCourse.image,
            description : enrolledCourse.description,
            price : 100 // handle price too 
        } 
        console.log(myNewPurchasedCourse);
        // myCourses.push(myNewPurchasedCourse)
        
        const newEnrolledCourse = new MyCourses( myNewPurchasedCourse )
        await newEnrolledCourse.save() 
        // adding course to MyCourses and seaching it with userName  
    // }
    
    res.redirect('/dashboard') 
})

/* ------------------DashBoard ----------------------- */


/* -------------------  Rendering My Courses --------------------*/

app.get('/my-courses', async (req,res)=>{
    const fetchMycourses =   await MyCourses.find({userName : userName})
    console.log( 'fetching my courses from database ' +   fetchMycourses);

    res.render('mycourses', {fetchMycourses}) 
})

/*-------------------------Rendering My Courses ----------------- */

app.get('/',(req,res)=>{
    res.render('authenticate')
})

app.post('/',  async (req,res)=>{
    // checking if user Exist or not 
   const existingUser =  await User.findOne({name:req.body.name} )
   if(existingUser){
    console.log('UserName Exist') ;
    res.redirect('/')
   }
   else{
    const NewUser = new User({name: req.body.name, password: req.body.password  }) //myCourses : []
    await NewUser.save()
    console.log('User Added ');
    res.redirect('/login') 
   }
})




/*------------------------Starting MongoDb Server--------------------*/ 
const start = async ()=>{
    try{
        const uri = 'mongodb+srv://Storage:abc%40123@cluster0.4botlhv.mongodb.net/'
        await mongoose.connect(uri)         
    app.listen(3000, () => { console.log('Listening ...'); });
    }
    catch(e){
        console.log('Error');
    }
}
start() 

