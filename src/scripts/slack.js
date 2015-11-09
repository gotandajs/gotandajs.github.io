let form;

let initialize = function() {
  form = document.querySelector('#slack form');
  form.addEventListener('submit', onSubmit);
  form.querySelector('a').addEventListener('click', onSubmit);
};

let onSubmit = function(event) {
  event.preventDefault();
  let email = form.email.value;
  console.log(email);
};

export default initialize;
