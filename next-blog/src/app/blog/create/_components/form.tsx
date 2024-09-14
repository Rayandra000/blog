"use client"

import RichTextEditor from "./editor"
import { useFormik } from "formik";
import { ErrorMsg } from "@/components/Form/ErrorMessage";
import { useEffect } from "react";
import { createSlug } from "@/helper/createSlug";
import FieldText from "@/components/Form/FieldText";
import FieldSelect from "@/components/Form/FieldSelect";
import { FieldImage } from "@/components/Form/FieldImage";
import * as Yup from 'yup'
import { BlogInput } from "@/type/blog";

export const blogSchema = Yup.object({
    title: Yup.string()
      .min(5, 'Title must be at least 5 characters long')
      .max(100, 'Title must be at most 100 characters long')
      .required('Title is required'),
    category: Yup.string()
      .required('Category is required'),
    content: Yup.string()
      .min(20, 'Content must be at least 20 characters long')
      .required('Content is required'),
    image: Yup.mixed()
      .test('fileType', 'Only JPEG & PNG', (value) => !value || (value instanceof File && ['image/jpeg', 'image/png', 'image/jpg'].includes(value.type)))
      .test('fileSize', 'File size too large (max 5MB)', (value) => !value || (value instanceof File && value.size <= 5242880)) // 5 MB in bytes
      .required('Image is required')
  });

const initialValues: BlogInput = {
    title: '',
    category: '',
    content: '',
    slug: '',
    image: ''
};

export const FormCreate: React.FC = () => {
    const onCreate = async (data: BlogInput) => {
        try {
          console.log(data);
        } catch (err) {
          console.log(err);
        }
    }

    const formik = useFormik({
        initialValues,
        validationSchema: blogSchema,
        onSubmit: (values, action) => {
            onCreate(values)
            action.resetForm()
        }
    });

    useEffect(() => {
    formik.setFieldValue('slug', createSlug(formik.values.title));
    }, [formik.values.title]);

    return (
        <div className="px-[20px] lg:px-[200px] md:px-[50px]">
            <form onSubmit={formik.handleSubmit} className="flex flex-col gap-3">
                <FieldText 
                    name="title" 
                    formik={formik} 
                    label="Title" 
                />
                <div>
                    <label htmlFor="slug" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Slug</label>
                    <input type="text" name="slug" value={formik.values.slug} readOnly disabled className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                </div>
                <FieldSelect 
                    name="category" 
                    label="Category" 
                    formik={formik} 
                    options={[
                        { label: "~ Pilih Category ~", value: "" },
                        { label: "Health", value: "Health" },
                        { label: "Sport", value: "Sport" },
                        { label: "Science", value: "Science" },
                        { label: "Tech", value: "Tech" },
                    ]}
                />
                <FieldImage name="image" label="Image" formik={formik} />
                <div>
                    <label htmlFor="content" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Content</label>
                    <RichTextEditor formik={formik} />
                    <ErrorMsg formik={formik} name="content" />
                </div>
                <div className="flex sm:justify-end">
                    <button 
                        type="submit"
                        className={`w-full h-[40px] sm:w-[120px] disabled:cursor-not-allowed text-[#f5f5f7] bg-[#383839] hover:bg-[#595959] rounded-lg`}
                    >
                        Save
                    </button>
                </div>
            </form>
        </div>
    )
}