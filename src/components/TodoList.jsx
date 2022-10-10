function TodoList() {
  let index = 0;
  const todoList = [
    {
      id: 0,
      title: "방 청소하기",
      isChecked: false,
    },
    {
      id: 1,
      title: "빨래 하기",
      isChecked: true,
    },
    {
      id: 2,
      title: "리엑트 공부하기",
      isChecked: false,
    },
    {
      id: 3,
      title: "헬스장 가기",
      isChecked: true,
    },
    {
      id: 4,
      title: "산책 가기",
      isChecked: false,
    },
    {
      id: 5,
      title: "책 읽기",
      isChecked: true,
    },
  ];

  const handleClick = () => {
    index = index + 1;
  };

  const todoItems = todoList.map((todo, index) => (
    <div>
      <id>{index + 1}번째 입니다.</id>
      <p>{todo.title}</p>
    </div>
  ));

  return (
    <section>
      <h1>후니의 할일 보기</h1>
      <div>{todoItems[index]}</div>
      <button onClick={handleClick}>다음</button>
    </section>
  );
}

export default TodoList;
