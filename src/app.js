 import {http} from './http';
 import {ui} from './ui';
 
// get posts on DOM load
document.addEventListener('DOMcontentLoaded', getPosts());

// Listen for add Post
 document.querySelector('.postSubmit').addEventListener('click', addPost);

 //listen for Delete

 document.querySelector('#post').addEventListener('click', deletePost);

 // listen for edit state

 document.querySelector('#post').addEventListener('click', enableEdit);

 //Listen for Cancel

 document.querySelector('.postContainer').addEventListener('click', cancelEdit);

 //Submit Post

 async function addPost(){
   const title = document.querySelector('#title').value;
   const body = document.querySelector('#body').value;
   const id = document.querySelector('#id').value;
   const selectQuantity = document.querySelector('#selectQuantity').value;
   const data = {
     title: title,
     body: body,
     id: id,
     selectQuantity: selectQuantity
   }
  // Validate input

  if(title === ' ' || body === '') {
    ui.showAlert('Please fill in all fields', 'notification is-danger is-light');
  } 
  else {
    // check for ID
    if(id === '') {
      // Create post
      try {
        const res = await http.post('http://localhost:3000/post', data)
        ui.showAlert('Post Added', 'notification is-success is-light');
        ui.clearFields();
        getPosts();
      } catch (e) {
        console.error(e);
      } 

    }else{ 
      // update the post

      try {
        const res = await http.put(`http://localhost:3000/post/${id}`, data)
        ui.showAlert('Post Updated', 'notification is-success is-light');
        ui.changeFormState('add');
        getPosts();
      }catch(e) {
        console.log(e);
      }

    }
  }
}

    // Delete Post
    function deletePost(e){
      e.preventDefault();
      if(e.target.parentElement.classList.contains('remove')){
        const id = e.target.parentElement.dataset.id;
        if (confirm('Are you Sure Remove the Item!')) {
          http.delete(`http://localhost:3000/post/${id}`)
          .then (data =>{
            ui.showAlert ('Post Removed', 'notification is-success is-light');
            this.getPosts();
          })
          .catch (err => console.log(err));
        } 
      }
      e.preventDefault();
    }
    // Enable Edit State
    function enableEdit (e) {
         if(e.target.parentElement.classList.contains('edit')) {
        const id= e.target.parentElement.dataset.id;
        let title =  e.target.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.textContent;
            title = title.trim();
        const body = e.target.parentElement.previousElementSibling.previousElementSibling.textContent;
        const selectQuantity = e.target.parentElement.previousElementSibling.textContent;
        const data = {
          id: id,
          title: title,
          body: body,
          selectQuantity: selectQuantity
        }
        // Fill form with corrent Post

        ui.fillForm(data);
      }
      e.preventDefault();
    }

     async function getPosts(){
       try{
         const data= await http.get('http://localhost:3000/post');
         ui.showPost(data);
       }catch(e) {
         console.log(e);
       }
     }

     // cancel edit State

     function cancelEdit(e){
       if (e.target.classList.contains('post-cancel')){
         ui.changeFormState('add');
       }
       e.preventDefault();
     }


 
 