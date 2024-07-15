const form = document.getElementById('validation_form');
let username = document.getElementById('username');
let email = document.getElementById('email');
let ph_no = document.getElementById('phone');
let password = document.getElementById('password');
const confirmPassword = document.getElementById('cpassword');
const popup = document.getElementById('pop-up');
const confirm_popup = document.getElementById('confirm-pop-up');
const popup_msg = document.getElementById('message');
const confirm_msg = document.getElementById('confirm-message');
const ok_btn = document.getElementById("ok-btn");
const cancel_btn = document.getElementById("cancel-btn");
const confirmed_btn = document.getElementById("confirmed");
const table_body = document.getElementById('registered-data').getElementsByTagName('tbody');

const ResetBtn = document.createElement('button');
ResetBtn.type = "reset";
ResetBtn.textContent = 'OK';
ResetBtn.classList.add('new_ok_btn');

const ok_btn1 = document.createElement('button');
ok_btn1.type = 'button';
ok_btn1.textContent = 'OK';
ok_btn1.classList.add('ok_btn1');

let msgBoxBtn = ok_btn;
let confirm_val;
let registration_data = [];
let row_Index = -1;

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  if (!username.value) {
    validation_info('Username is required');
  }
  else if (username.value.length < 3) {
    validation_info('Username should be at least 3 characters long.');
  }
  else if (!email.value) {
    validation_info('Please enter your email ID.');
  }
  else if (!(ph_no.value.length == 10)) {
    validation_info('Please enter a valid number.');
  }
  else if (!password.value) {
    validation_info('Please set your password.');
  }
  else if (!confirmPassword.value) {
    validation_info('Please confirm your password.');
  }
  else {
    if (await confirmation()) {
      popup.style.display = 'flex';
      popup.style.borderColor = 'green';
      msgBoxBtn.parentNode.replaceChild(ResetBtn, msgBoxBtn);
      form.getElementsByClassName('data')[0].style.filter = "blur(5px)";
      if (document.getElementsByClassName('submit-btn')[0].textContent == 'Update') {
        document.getElementsByClassName('submit-btn')[0].textContent = "Register";
        popup_msg.textContent = 'User Data Updated.';
        saveData("update");
      }
      else {
        popup_msg.textContent = 'Registration Successful.';
        saveData("new");
      }
    }
    else{
      form.reset();
    }
  }
});

function validateEmail() {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!re.test(email.value) && email.value != '') {
    document.getElementsByClassName('invalid_msg')[1].textContent = "Please enter a valid email ID.";
  }
  else {
    document.getElementsByClassName('invalid_msg')[1].textContent = "";
  }
}
function validateNumber() {
  if (ph_no.value.length != 10 && ph_no.value != '') {
    document.getElementsByClassName('invalid_msg')[2].textContent = "Please enter a valid Number.";
  }
  else if (!/^[0-9]+$/.test(ph_no.value) && ph_no.value != '') {
    document.getElementsByClassName('invalid_msg')[2].textContent = "Please enter a valid Number.";
  }
  else {
    document.getElementsByClassName('invalid_msg')[2].textContent = "";
  }
}
function validateUserName() {
  if (username.value != '') {
    if (!/^[a-zA-Z]+$/.test(username.value)) {
      document.getElementsByClassName('invalid_msg')[0].textContent = "Username must contain only letters.";
    }
    else {
      document.getElementsByClassName('invalid_msg')[0].textContent = "";
    }
  }
  else {
    document.getElementsByClassName('invalid_msg')[0].textContent = "";
  }
}
function validatePassWord(index) {
  const current_element = document.getElementById(document.activeElement.id);
  if (current_element.value != '') {
    if (!/^[a-zA-Z0-9|@|#|$|&|-]+$/.test(current_element.value)) {
      document.getElementsByClassName('invalid_msg')[index].textContent = "Password contains only a-z,A-Z,0-9 and @,#,$,&,-";
    }
    else {
      if (password.value.length < 8) {
        document.getElementsByClassName('invalid_msg')[index].textContent = "Password must be at least 8 characters";
      }
      else {
        document.getElementsByClassName('invalid_msg')[index].textContent = "";
      }
      if (confirmPassword.value !== password.value && confirmPassword.value !== '') {
        if (password.value != '') {
          document.getElementsByClassName('invalid_msg')[3].textContent = "Passwords do not match";
        }
        else {
          document.getElementsByClassName('invalid_msg')[3].textContent = "Set your password first";
        }
      }
      else {
        document.getElementsByClassName('invalid_msg')[3].textContent = "";
      }
    }
  }
  else {
    document.getElementsByClassName('invalid_msg')[index].textContent = "";
  }
}
function validation_info(message) {
  popup.style.borderColor = 'red';
  popup.style.display = 'flex';
  form.getElementsByClassName('data')[0].style.filter = "blur(5px)";
  popup_msg.textContent = message;
};
async function confirmation() {
  confirm_popup.style.display = 'flex';
  confirm_popup.style.borderColor = '#c08921';
  form.getElementsByClassName('data')[0].style.filter = "blur(5px)";
  confirm_msg.textContent = 'Do you want to confirm...';
  try {
    await new Promise((resolve, reject) => {
      confirmed_btn.addEventListener('click', () => {
        confirm_popup.style.display = 'none';
        form.getElementsByClassName('data')[0].style.filter = "blur(0px)";
        confirm_val = true;
        resolve();
      });
      cancel_btn.addEventListener('click', () => {
        confirm_popup.style.display = 'none';
        form.getElementsByClassName('data')[0].style.filter = "blur(0px)";
        confirm_val = false;
        reject();
      });
    });
  }
  catch (error) {
    // console.log(error);
  }
  return confirm_val;
};
ok_btn.addEventListener('click', () => {
  popup.style.display = 'none';
  ok_btn.style.backgroundColor = 'red';
  form.getElementsByClassName('data')[0].style.filter = "blur(0px)";
});
ResetBtn.addEventListener('click', () => {
  form.reset();
  popup.style.display = 'none';
  msgBoxBtn = ok_btn1;
  ResetBtn.parentNode.replaceChild(msgBoxBtn, ResetBtn);
  form.getElementsByClassName('data')[0].style.filter = "blur(0px)";
});
ok_btn1.addEventListener('click', () => {
  popup.style.display = 'none';
  ok_btn1.style.backgroundColor = 'red';
  form.getElementsByClassName('data')[0].style.filter = "blur(0px)";
});
function tableData(index) {
  const sessionData = JSON.parse(sessionStorage.getItem("allUserData"));
  if (sessionData) {
    if (registration_data.length == 1) {
      table_body[0].deleteRow(0);
    }
    const entry = sessionData[index];
    const row = table_body[0].insertRow(index);
    for (const item in entry) {
      if (item != 0) {
        const cell = document.createElement('td');
        cell.textContent = entry[item];
        row.appendChild(cell);
      }
    }
    const action_cell = document.createElement('td');
    action_cell.innerHTML = '<button id="action-btn-1" type="submit" onclick="editData(this)">EDIT</button><br><button id="action-btn-2" type="submit" onclick="deleteData(this)">DELETE</button>';
    row.appendChild(action_cell);
    if (index == row_Index && index != 0) {
      table_body[0].deleteRow(index + 1);
      row_Index = -1;
    }
  } else {
    table_body[0].insertRow().innerHTML = '<td colspan="5">No data found in session storage.</td>';
  }
}
function saveData(op) {
  const FormData = {};
  FormData[1] = username.value;
  FormData[2] = email.value;
  FormData[3] = ph_no.value;
  FormData[4] = password.value;
  if (op == "new") {
    let date = new Date().toJSON();
    FormData[0] = date;
    registration_data.push(FormData);
    sessionStorage.setItem("allUserData", JSON.stringify(registration_data));
    tableData(registration_data.length - 1);
  }
  else {
    FormData[0] = registration_data[row_Index][0];
    registration_data.splice(row_Index, 1, FormData)
    sessionStorage.setItem("allUserData", JSON.stringify(registration_data));
    tableData(row_Index);
  }
}
table_body[0].insertRow().innerHTML = '<td colspan="5">No data found in session storage.</td>';

function editData(element) {
  const session_Data = JSON.parse(sessionStorage.getItem("allUserData"));
  document.getElementsByClassName("submit-btn")[0].textContent = "Update";
  row_Index = (element.parentNode.parentNode.rowIndex) - 1;
  username.value = session_Data[row_Index][1];
  email.value = session_Data[row_Index][2];
  ph_no.value = session_Data[row_Index][3];
  password.value = session_Data[row_Index][4];
}
async function deleteData(element) {
  const session_Data = JSON.parse(sessionStorage.getItem("allUserData"));
  const index = element.parentNode.parentNode.rowIndex - 1;
  if (await confirmation()){ 
    session_Data.splice(index, 1);
    registration_data.splice(index, 1);
    sessionStorage.setItem("allUserData", JSON.stringify(session_Data));
    table_body[0].deleteRow(index);
  }
  if (session_Data.length == 0) {
    table_body[0].insertRow().innerHTML = '<td colspan="5">No data found in session storage.</td>';
  }
}