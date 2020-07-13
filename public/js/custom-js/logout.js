async function logoutFunction(fromLogoutPage = false) {
  localStorage.clear();
  if (!fromLogoutPage) {
    let status = 'unsuccessful';
    let message;
    try {
      const { data } = await axios.get('/v1/auth/logout');
      status = data.status;
      message = data.data;
    } catch (e) {
      message = 'Logout unsuccessful';
    }
    document.getElementById('logout-toast').classList.add(status);
    document.getElementById('logout-toast-body').innerHTML = message;
  }
  $('.toast').toast('show');
  // localStorage.setItem('tpAuth', '');
  window.location.replace('/');
}
$('.toast').toast({
  delay: 1200,
});
