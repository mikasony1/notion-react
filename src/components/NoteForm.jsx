import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

export default function NoteForm({
  onSubmit,
  initialTitle = "",
  initialBody = "",
  buttonText,
  titleText,
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <div className="flex items-center w-full bg-slate-300">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-3/4 grid grid-cols-4 grid-rows-3 mx-auto justify-items-center"
      >
        <button className="self-start text-base py-1 px-5 mt-4 bg-slate-400 font-medium">
          <Link to="/notes">Back</Link>
        </button>
        <h2 className="col-start-2 col-end-4 text-5xl mb-10">{titleText}</h2>
        <div className="w-full col-start-1 col-end-5 row-start-2 row-end-3 flex justify-center">
          <div className="flex flex-col w-4/5">
            <input
              type="text"
              placeholder="Title"
              defaultValue={initialTitle}
              className="min-h-10 mb-1.5 px-4"
              {...register("title", { required: true })}
            />
            <div className=" mb-3">
              {errors.title && (
                <p className="mb-3 text-red-600">Title is required</p>
              )}
            </div>
            <textarea
              className=" min-h-24 px-4 pt-2"
              defaultValue={initialBody}
              placeholder="Body"
              {...register("body")}
            />
          </div>
        </div>
        <button className="row-start-3 row-end-4 col-start-1 col-end-5 self-center bg-slate-400 px-24 py-3 text-xl font-medium">
          {buttonText}
        </button>
      </form>
    </div>
  );
}
