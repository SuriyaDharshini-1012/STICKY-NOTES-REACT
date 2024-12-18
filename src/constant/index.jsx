export const BASE_URL = "http://localhost:8081/api/v1/auth";


export const SignUpFields = [
           {
          name: 'firstName',
          placeholder: 'First name',
          type: 'text',
         },
        {
          name: 'lastName',
          placeholder: 'Last name',
          type: 'text',
          },
       {
          name: 'email',
          placeholder: 'Email',
          type: 'email',
         },
        {
          name: 'password',
          placeholder: 'Password',
          type: 'password',
          },
      
];

export const SignInFields=[
  {
    name: 'email',
    placeholder: 'Email',
    type: 'email',
    error: 'error',
   },
   {
    name: 'password',
    placeholder: 'Password',
    type: 'password',
    error:'error',
    },

]
export const Colour=['#ffee8c', '#ffcccb', '#add8e6', '#90ee90', '#00CC66', '#d3d3d3', '#FF6666', '#CC99FF', '#00bfff'];


export const cardsData = [
  {
    title: '📝 Brainstorming',
    text: 'Capture your ideas quickly and easily with sticky notes.',
    bgColor: 'bg-light',
    textColor: 'text-dark',
    className: 'col-md-9',
  },
  {
    title: '✅ To-Do Lists',
    text: 'Stay organized and keep track of your tasks effortlessly.',
    bgColor: 'bg-info',
    textColor: 'text-white',
    className: 'col-md-6',
  },
  {
    title: '⏰ Reminders',
    text: 'Set reminders for tasks and never miss a deadline.',
    bgColor: 'bg-warning',
    textColor: 'text-white',
    className: 'col-md-4',
  }
];
