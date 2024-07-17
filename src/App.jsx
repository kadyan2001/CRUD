import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {EmployeeData} from './EmployeeData'
import { useEffect } from 'react'

function App() {
  const [data, setData] = useState([])
  const [firstname,setFirstname]=useState('')
  const [lastname,setLastname]=useState('')
  const [age,setAge]=useState(0)
  const [id,setId]=useState(0)
  const [isUpdate,setIsUpdate]=useState(false)





  useEffect(()=>{
    setData(EmployeeData)

  },[]);

  const handleEdit=(id)=>{
    const dt=data.filter(item=>item.id===id)
    if(dt!==undefined){
      setIsUpdate(true);
      setId(id);
      setFirstname(dt[0].firstname);
      setLastname(dt[0].lastname);
      setAge(dt[0].age);
    }
    }

  const handleDelete=(id)=>{
    if(id>0){
      if(window.confirm("Are you sure you want to delete item?")){
        const dt=data.filter(item=>item.id!==id);
      setData(dt);
      }    
    }
    }

    const handleUpadate=()=>{
      const index=data.map((item)=>{
        return item.id
      }).indexOf(id);

      const dt=[...data];
      dt[index].firstname=firstname;
      dt[index].lastname=lastname;
      dt[index].age=age;

      setData(dt);
      handleClear();  
     }

    const handleSave=(e)=>{
      e.preventDefault();
      const dt=[...data];
      const newObject={
        id:EmployeeData.length+1,
        firstname:firstname,
        lastname:lastname,
        age:age

      }

      dt.push(newObject);

      setData(dt);

    }


    const handleClear=(id)=>{
      setId(0);
      setFirstname('');
      setLastname('');
      setAge('');
      setIsUpdate(false)
    }

  return (
    <>
      <div className='App'>

        <div style={{display:'flex' ,justifyContent:'center', marginTop:"10px",marginBottom:"10px"}}>
          <div>
            <label>FirstName:
              <input type='text' placeholder='Enter First Name'  onChange={(e)=>setFirstname(e.target.value)} value={firstname}/>

            </label>

            <label>LastName:
              <input type='text' placeholder='Enter Last Name' onChange={(e)=>setLastname(e.target.value)} value={lastname}/>
 
            </label>

            <label>Age:
              <input type='number' placeholder='Enter Age ' onChange={(e)=>setAge(e.target.value)}value={age}/>

            </label>
          </div>

          <div>
            {
              !isUpdate ?
              <button className='btn btn-primary' onClick={(e)=>handleSave(e)}>Save</button>
              :
              <button className='btn btn-primary' onClick={()=>handleUpadate()}>Update</button>
            }

                      <button className='btn btn-danger' onClick={()=>handleClear()}>Clear</button>
          </div>
        

        </div>

        <table className='table table-hover'>
          <thead>
            <tr>
              <td>Sr. No</td>
              <td>id</td>
              <td>FirstName</td>
              <td>LastName</td>
              <td>Age</td>
              <td>Actions</td>
            </tr>
          </thead>

          <tbody>
            {
              data.map((item,index)=>{
                return(
                  <tr key={index}>
                    <td>{index+1}</td>
                    <td>{item.id}</td>
                    <td>{item.firstname}</td>
                    <td>{item.lastname}</td>
                    <td>{item.age}</td>
                    <td>
                      <button className='btn btn-primary' onClick={()=>handleEdit(item.id)}>Edit</button>
                      <button className='btn btn-danger' onClick={()=>handleDelete(item.id)}>Delete</button>

                    </td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>

      </div>
    </>
  )
}

export default App
