export default function logout() {
  window.localStorage.removeItem("grokth_token");
  window.localStorage.removeItem("grokth_avatar");
  window.localStorage.removeItem("grokth_name");
  window.localStorage.removeItem("ref_code");
  window.location.href = "../";
}
