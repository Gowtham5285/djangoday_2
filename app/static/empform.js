let addEmpBtn=document.getElementById("addEmpBtn")
function renderEmployees() {
    let allEmps = JSON.parse(localStorage.getItem("emps")) || [];

    let tbody = document.getElementById("empTableBody");
    tbody.innerHTML = "";

    allEmps.forEach(emp => {
        let row = `
            <tr>
                <td>${emp.name}</td>
                <td>${emp.email}</td>
                <td>${emp.salary}</td>
            </tr>
        `;
        tbody.innerHTML += row;
    });
}
window.onload = renderEmployees;

addEmpBtn.addEventListener("click",(e)=>{
    let allEmps=JSON.parse(localStorage.getItem("emps")) || [] 
    e.preventDefault()

    let newEmp={
        name: document.getElementById("empName").value ,
        email: document.getElementById("empEmail").value ,
        salary: document.getElementById("empSal").value 
    }
    fetch("/api/create_emp/",{
        method:"POST", 
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(newEmp)
    }).then(res=>res.json()).then(res=>{
        alert("Record Added Successfully")
        allEmps.push(newEmp)
        localStorage.setItem("emps",JSON.stringify(allEmps))
        renderEmployees();
    })

})

