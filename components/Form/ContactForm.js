import { useForm } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// TODO https://blog.devgenius.io/creating-advanced-reusable-forms-in-next-js-611325fb4eee

// TODO add GDPR field

export const ConatactForm = ({ sendContactTo }) => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
    reset,
  } = useForm();

  async function saveFormData(data) {
    return await fetch('/api/contact', {
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
    });
  }

  const onSumbit = async (data) => {
    const response = await saveFormData(data);

    if (response.ok) {
      toast.success('Zprava úspěšně odeslána');
    } else {
      toast.error(
        'An unexpected error occurred while saving, please try again'
      );
    }
    reset();
  };

  const inputClassName = `block p-3 w-full text-sm text-gray-900 bg-white border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light`;

  return (
    <section>
      <div className='py-2 px-4 mx-auto'>
        <form
          action='#'
          className='space-y-8'
          onSubmit={handleSubmit(onSumbit)}>
          <input
            type='hidden'
            value={sendContactTo}
            name='sendEmailTo'
            {...register('sendContactTo')}
          />

          <div>
            <label
              htmlFor='name'
              className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
              Jméno
            </label>
            <input
              type='text'
              id='name'
              className={
                errors.name
                  ? `${inputClassName} !border-red-500 dark:border-red-500`
                  : inputClassName
              }
              placeholder='Jan Novák'
              {...register('name', { required: 'Toto pole je povinné' })}
              aria-invalid={errors.name ? 'true' : 'false'}
            />

            {errors.name && (
              <p
                role='alert'
                className='mt-2 px-2 font-small text-sm text-red-600'>
                {errors.name?.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor='email'
              className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
              Email
            </label>
            <input
              type='email'
              id='email'
              className={
                errors.email
                  ? `${inputClassName} !border-red-500 dark:border-red-500`
                  : inputClassName
              }
              placeholder='jannovak@email.com'
              {...register('email', {
                required: 'Toto pole je povinné',
              })}
              aria-invalid={errors.email ? 'true' : 'false'}
            />
            {errors.email && (
              <p
                role='alert'
                className='mt-2 px-2 font-small text-sm text-red-600'>
                {errors.email?.message}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor='phone'
              className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
              Telefon
            </label>
            <input
              type='text'
              id='phone'
              className='block p-3 w-full text-sm text-gray-900 border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light'
              placeholder='+420776596563'
              {...register('phone')}
            />
          </div>
          <div className='sm:col-span-2'>
            <label
              htmlFor='message'
              className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
              Zpráva
            </label>
            <textarea
              id='message'
              rows='6'
              className={
                errors.message
                  ? `block p-2.5 w-full text-sm text-gray-900 shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 !border-red-500 dark:border-red-500`
                  : `block p-2.5 w-full text-sm text-gray-900 shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500`
              }
              placeholder='Vaše zpráva...'
              {...register('message', {
                required: 'Toto pole je povinné',
              })}></textarea>

            {errors.message && (
              <p
                role='alert'
                className='mt-2 px-2 font-small text-sm text-red-600'>
                {errors.message?.message}
              </p>
            )}
          </div>
          <div className='!mt-4'>
            <p className='font-small text-sm  text-center lg:text-right'>
              Odesláním souhlasíte se{' '}
              <a
                href='../suhlas-so-spracovanim-osobnych-udajov'
                className='underline hover:no-underline'>
                zpracováním osobních údajů.
              </a>
            </p>
          </div>
          <div className='text-right'>
            <button
              type='submit'
              className={
                isSubmitting
                  ? `inline-block py-3 px-5 lg:px-10 ml-auto mr-0 text-sm font-medium text-center sm:w-fit focus:ring-4 focus:outline-none focus:ring-primary-300 dark:focus:ring-primary-800 text-black bg-gray-400 border-solid border-2 border-gray-400 transition-colors duration-300 ease-in-out cursor-not-allowed dark:text-white`
                  : `inline-block py-3 px-5 lg:px-10 ml-auto mr-0 text-sm font-medium text-center sm:w-fit focus:ring-4 focus:outline-none focus:ring-primary-300 dark:focus:ring-primary-800 text-white bg-primary border-solid border-2 border-primary transition-colors duration-300 ease-in-out hover:bg-white hover:text-primary dark:bg-secondary dark:border-secondary dark:hover:text-white dark:hover:bg-transparent`
              }
              disabled={isSubmitting}>
              {isSubmitting ? 'Odesílám...' : 'Odeslat'}
            </button>
          </div>
        </form>
        <ToastContainer />
      </div>
    </section>
  );
};
