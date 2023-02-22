import React from "react";
import { useTodos } from "./useTodos";
import { HeaderComponent } from "../components/HeaderComponent";
import { ProgressComponent } from "../components/ProgressComponent";
import { CircleProgress } from "../components/ProgressComponent/CircleProgress";
import { BarComponent } from "../components/BarComponent";
import { ListComponent } from "../components/ListComponent";
import { ModalComponent } from "../components/ModalComponent";
import { FormComponent } from "../components/FormComponent";
import { TodoComponent } from "../components/TodoComponent";
import { ErrorComponent } from "../components/ErrorComponent";
import { LoadingComponent } from "../components/LoadingComponent";
import { NoTodosComponent } from "../components/NoTodosComponent";
import { NoMatchesComponent } from "../components/NoMatchesComponent";
import { ChangeStorage } from "../components/ChangeLocalStorage";

import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

function App() {
  const {
    dataState,
    totalTodos,
    searchedTodos,
    toogleTodo,
    deleteTodo,
    completedTodos,
    setOpenModal,
    addTodo,
    onChangeSearch,
    searchValue,
    openModal,
    onClickButton,
    syncronizeTodos,
    onCreating,
    saveTodos,
  } = useTodos();

  return (
    <div className="app">
      <HeaderComponent>
        <ProgressComponent>
          <CircleProgress
            completedTodos={completedTodos}
            totalTodos={totalTodos}
            circleWidth="200"
          />
        </ProgressComponent>
      </HeaderComponent>
      <BarComponent onChangeSearch={onChangeSearch} searchValue={searchValue} />

      <DragDropContext
        onDragEnd={(param) => {
          const srcI = param.source.index;
          const desI = param.destination?.index;
          if (desI !== undefined) {
            searchedTodos.splice(desI, 0, searchedTodos.splice(srcI, 1)[0]);
          } else {
            searchedTodos.splice(desI, 0, searchedTodos[srcI]);
            if (srcI < desI) {
              searchedTodos.splice(srcI, 1);
            } else {
              searchedTodos.splice(srcI + 1, 1);
            }
          }
          saveTodos(searchedTodos);
        }}
      >
        <ListComponent
          dataState={dataState}
          searchedTodos={searchedTodos}
          totalTodos={totalTodos}
          onError={() => <ErrorComponent />}
          onEmptyTodos={() => <NoTodosComponent />}
          onNoMatches={() => <NoMatchesComponent searchValue={searchValue} />}
          onClickButton={onClickButton}
        >
          <Droppable droppableId="droppable-1">
            {(provided, _) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                <div style={{ height: "100px" }}></div>
                {searchedTodos.map((todo, i) => (
                  <Draggable
                    key={todo.text}
                    draggableId={"draggable-" + todo.text}
                    index={i}
                  >
                    {(provided, _) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <TodoComponent
                          todo={todo}
                          onToogleTodo={() => toogleTodo(todo.text)}
                          onDeleteTodo={() => deleteTodo(todo.text)}
                        />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </ListComponent>
      </DragDropContext>

      {!!openModal && (
        <ModalComponent
          dataState={dataState}
          onCreating={onCreating}
          onLoading={() => <LoadingComponent />}
          onForm={() => (
            <FormComponent addTodo={addTodo} setOpenModal={setOpenModal} />
          )}
        />
      )}
      <ChangeStorage syncronizeTodos={syncronizeTodos} />
    </div>
  );
}

export default App;
