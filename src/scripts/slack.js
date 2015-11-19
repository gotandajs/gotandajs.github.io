import request from 'superagent';

const API_BASE = 'https://api.hotolab.net/gotandajs/slack';

let form;

let initialize = function() {
  form = document.querySelector('#slack form');

  request.get(API_BASE).end((err, res) => {
    if ( err ) { return }
    document.querySelector('.slack_status .total').textContent = res.body.total;
    document.querySelector('.slack_status .online').textContent = res.body.online;
  });

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

  let params = { email: form.email.value };
  request.post(API_BASE).send(params).end((err, res) => {
    if ( err ) { return handleError(err) }
    form.className = 'ok disable';
    console.log(res.body);
  });
};

let handleError = function(msg) {
  form.className = 'ng';
  form.email.disabled = false;
  console.error(msg);
  setTimeout(() => form.className = '', 1000);
};

export default initialize;
