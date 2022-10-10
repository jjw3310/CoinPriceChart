export default function Form() {
  let firstName = "";
  let lastName = "";

  function handleFirstNameChange(e) {
    firstName = e.target.value;
  }

  function handleLastNameChange(e) {
    lastName = e.target.value;
  }

  function handleReset() {
    firstName = "";
    lastName = "";
  }

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <input
        placeholder="성"
        value={firstName}
        onChange={handleFirstNameChange}
      />
      <input
        placeholder="이름"
        value={lastName}
        onChange={handleLastNameChange}
      />
      <h1>
        블록체인 스쿨에 오신걸 환영합니다, {firstName} {lastName}
      </h1>
      <button onClick={handleReset}>이름 초기화</button>
    </form>
  );
}
