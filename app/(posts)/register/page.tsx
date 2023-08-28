const RegisterPage = () => {
  return ( 
    <div>
      <form >
        <label htmlFor="fname">First name:</label>
        <input type="text" id="fname" name="fname" value="John" />
        <label htmlFor="lname">Last name:</label>
        <input type="text" id="lname" name="lname" value="Doe" />
        <input type="submit" value="Submit" />
      </form>
    </div>
   );
}
 
export default RegisterPage;