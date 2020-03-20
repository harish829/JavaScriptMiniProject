class UI {
  constructor (){
    this.post = document.querySelector('#post');
    this.titlePost = document.querySelector('#title');
    this.bodyInput = document.querySelector('#body');
    this.idInput = document.querySelector('#id');
    this.selectQuantity = document.querySelector ('#selectQuantity');
    this.postSubmit = document.querySelector('.postSubmit');
    this.forState = document.querySelector('#title');
    this.forState = 'add';
  }

showPost(posts) {
  let output = '';

  posts.forEach((post) => {
    output +=`
      <div class="card">
        <div class="card-content card-body">
        <h4 class="card-title is-size-3">
           ${post.title} 
        </h4>
        <p class="card-text is-size-4">
         ${post.body} 
        </p>
        <p class="card-text is-size-4"> ${post.selectQuantity}</p>
        <a href="#" class="card-link edit" data-id="${post.id}">
        <i class="fas fa-pencil-alt has-text-primary"></i>
        </a>
        <a href="#" class="remove" data-id="${post.id}">
        <i class="fa fa-times has-text-danger"></i>
        </a>
        </div>
      </div>

    `;
  });
  this.post.innerHTML = output;
}
 showAlert(message, className){
   this.clearAlert();
   //Create div
   const div = document.createElement('div');

   //Add Class
   div.className = className;

   //Add Text
   div.appendChild(document.createTextNode(message));

   //Get Parent
   
   const container = document.querySelector('.postContainer');
   //Get post
   const posts = document.querySelector('#post');

   //Insert alert div
   container.insertBefore(div, posts);

   //Time out

   setTimeout(() => {
     this.clearAlert();
   }, 3000);
  }

 clearAlert(){
   const currentAlert = document.querySelector('.notification');
   
   if (currentAlert){
     currentAlert.remove();
   }
 }
 clearFields(){
   this.titlePost.value = '';
   this.bodyInput.value = '';
 }

 // Fill form to Edit

 fillForm(data){
   this.titlePost.value = data.title;
   this.bodyInput.value = Number(data.body.trim());
   this.idInput.value = data.id;
   const options = document.querySelectorAll('option');
   for(let i=1;i < options.length; i++ ){
      if(options[i].value === data.selectQuantity.trim()){
        options[i].setAttribute('selected', 'selected');
      }
   }
     this.changeFormState('edit');
 }

 // clear ID hidden value

 clearInput(){
   this.idInput.value='';
 }

 //change the Form State

 changeFormState(type){  
   if(type === 'edit'){
    this.postSubmit.textContent = 'Update Post';
    this.postSubmit.className = 'postSubmit button is-warning is-block is-pulled-left m-r-15';
    
    // Create cancel button

    const button = document.createElement('button');
    button.className = 'post-cancel button is-light is-block';
    button.appendChild(document.createTextNode('Cancel Edit'));

    // Get Parent
    const cardForm = document.querySelector('.postContainer');
     // Get element to insert Before

   const formend = document.querySelector('.form-end');
   //Insert cancel button
   cardForm.insertBefore(button, formend);
   } 
   else {
     this.postSubmit.textContent = 'Post IT';
     this.postSubmit.className = 'post-submit button is-primary is-block';
     // remove cancel button if it is there

     if (document.querySelector('.post-cancel')){
       document.querySelector('.post-cancel').remove();
     }
     // Clear ID form hidden field
     this.clearInput();
     //Clear Text
     this.clearFields();
  }
 }
}
 
export const ui = new UI();

  