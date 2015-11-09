let form;

let initialize = function() {
  form = document.querySelector('#slack form');

  // add event
  form.addEventListener('submit', onSubmit);
  form.querySelector('a').addEventListener('click', onSubmit);

  // reset form
  form.className = '';
  form.email.value = ''
  form.email.disabled = false;
};

let onSubmit = function(event) {
  event.preventDefault();

  let email = form.email.value;
  if ( email.trim() === '' ) { return; }
  if ( ! email.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/) ) {
    return handleError('Invalid email address.');
  }

  form.className = 'wait disable';
  form.email.disabled = true;

  setTimeout(() => {
    let error = false;
    if ( error ) {
      handleError('error');
    }
    else {
      form.className = 'ok disable';
    }
  }, 1000);
};

let handleError = function(msg) {
  form.className = 'ng';
  form.email.disabled = false;
  console.error(msg);
  setTimeout(() => form.className = '', 1000);
};

export default initialize;
