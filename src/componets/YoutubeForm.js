import React from "react";
import "../componets/youtubeform.css";
import {useForm} from "react-hook-form";
import { DevTool } from "@hookform/devtools";


const YoutubeForm = () => {
    const form =useForm({
        // if alreday stored value from data base want shown in the default value
        defaultValues : async () => {
         const response = await fetch('https://jsonplaceholder.typicode.com/users/1')
         const data = await response.json()
         return {
            username : '',
            email : '',
            channel:'',
            gender:'male',
            socialIds : {
                twitter : '',
                facebook: ''
            },
            phoneNumbers : ['', ''],
            age: 0

         }
        }
    })
    const {register, control, handleSubmit , formState: { errors }} = form

    const onSubmit = (data) => {
        console.log("form submitted", data)
        alert("user Registered successfully")
    }
  return (
    <>
      <div className="container form-container">
        <div style={{ textAlign: "center", fontSize: "20px" }}>YoutubeForm</div>
        <div class="mb-3">
          <label for="username">Usernamex</label>
          <input
            type="text"
            class="form-control"
            id="username"
            placeholder="Enter your"
            {...register('username', { required:{
                value :true,
                message :'username is required',
            } , maxLength: 20 })}
          />
        </div>
        <p style={{color:"red"}}>{errors.username?.message}</p>
        <div class="mb-3">
          <label for="exampleFormControlInput1">Email address</label>
          <input
            type="email"
            class="form-control"
            id="exampleFormControlInput1"
            placeholder="name@example.com"
            {...register('email', { pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Invalid email formate"
              }, required:{
                value :true,
                message :'Invalid email formate',
            },
            validate : {
                notAdmin : (filedValue) =>{
                    return (
                        filedValue !== 'admin@example.com' || 'Enter a different Email'
                    )
                }
            }
            })}
          />
        </div>
        <p style={{color:"red"}}>{errors.email?.message}</p>
        <div class="mb-3">
          <label for="channel">Channel</label>
          <input
            type="text"
            class="form-control"
            id="channel"
            placeholder="Enter your Channel Name"
            {...register('channel', { required:{
                value :true,
                message :'ChannelName is required',
            }, maxLength: 20 })}
          />
        </div>
        <p style={{color:"red"}}>{errors.channel?.message}</p>
        <div class="mb-3">
          <label for="twitter">Twitter</label>
          <input
            type="text"
            class="form-control"
            id="twitter"
            placeholder="Enter your Twitter Account"
            {...register('socialIds.twitter', { required:{
                value :true,
                message :'twitterName is required',
            }, maxLength: 20 })}
          />
        </div>
        <div class="mb-3">
          <label for="channel">Facebook</label>
          <input
            type="text"
            class="form-control"
            id="facebook"
            placeholder="Enter your Facebook Account"
            {...register('socialIds.facebook')}
          />
        </div>
        <div class="mb-3">
          <label for="channel">Primary phone number</label>
          <input
            type="text"
            class="form-control"
            id="phoneNumbers"
            placeholder="Enter your Facebook Account"
            {...register('phoneNumbers.0')}
          />
        </div>
        <div class="mb-3">
          <label for="channel">Secondary phone number</label>
          <input
            type="text"
            class="form-control"
            id="phoneNumbers"
            placeholder="Enter your Facebook Account"
            {...register('phoneNumbers.1')}
          />
        </div>
        {/* <select class="form-select" id='gender' aria-label="Default select example" style={{marginBottom:"20px"}} 
        {...register('gender', { required:{
            value :true,
            message :'gender is required',
        } })}>
          <option selected>Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="other">other</option>
        </select>
        <p style={{color:"red"}}>{errors.gender?.message}</p> */}
        <select class="form-select" {...register("gender")} style={{marginBottom:'10px'}}>
        <option value="female">female</option>
        <option value="male">male</option>
        <option value="other">other</option>
      </select>
      <div class="mb-3">
          <label for="channel">Age</label>
          <input
            type="number"
            class="form-control"
            id="age"
            placeholder="Enter your Age"
            {...register('age', {
                valueAsNumber : true
            })}
          />
        </div>
        <button className="btn btn-success" onClick={handleSubmit(onSubmit)}>submit</button>
      </div>
      <DevTool control={control} /> {/* set up the dev tool */}
    </>
  );
};

export default YoutubeForm;
