function getCookies() {
  let cookies: any = {};
  document.cookie.split(";").forEach(cookie => {
    const cookiePart = cookie.split("=");
    cookies[cookiePart[0].trim()] = cookiePart[1].trim();
  })

  return cookies;
}

export default getCookies;