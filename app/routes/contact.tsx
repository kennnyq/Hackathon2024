import { ActionFunction, json } from "@remix-run/node";
import { useActionData, Form, redirect } from "@remix-run/react";
import { useState } from "react";
import DropUpButton from '~/components/DropUpButton'; // Import the DropUpButton

type ActionData = {
  formError?: string;
  fieldErrors?: {
    name?: string;
    email?: string;
    message?: string;
  };
  fields?: {
    name: string;
    email: string;
    message: string;
  };
};

export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData();
  const name = form.get("name");
  const email = form.get("email");
  const message = form.get("message");

  const errors: ActionData = {};

  if (
    typeof name !== "string" ||
    typeof email !== "string" ||
    typeof message !== "string"
  ) {
    return json(
      { formError: "Form not submitted correctly." },
      { status: 400 }
    );
  }

  const fieldErrors = {
    name: name.length === 0 ? "Name is required." : undefined,
    email:
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)
        ? "Invalid email address."
        : undefined,
    message: message.length === 0 ? "Message is required." : undefined,
  };

  if (Object.values(fieldErrors).some(Boolean)) {
    return json({ fieldErrors, fields: { name, email, message } }, { status: 400 });
  }

  // TODO: Implement your form submission logic here (e.g., send email, save to database)

  return redirect("/thank-you");
};

export default function Contact() {
  const actionData = useActionData<ActionData>();
  const [isSubmitted, setIsSubmitted] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="max-w-4xl w-full bg-white shadow-md rounded-lg overflow-hidden">
        <div className="md:flex">
          {/* Left Side - Additional Content */}
          <div className="w-full md:w-1/2 p-8 bg-blue-600 text-white">
            <h2 className="text-2xl font-bold mb-4">Welcome to Comet Park</h2>
            <p className="mb-6">
              At Comet Park, we strive to provide the best parking solutions for our community.
              Whether you're a student, faculty member, or visitor, our services are tailored to meet
              your parking needs efficiently and conveniently.
            </p>
            <p className="mb-4">
              Our state-of-the-art facilities ensure that your vehicle is safe and secure. With ample
              parking spaces, easy access, and competitive pricing, parking has never been easier.
            </p>
            <p>
              Explore our website to learn more about our services, find the perfect parking spot,
              and get in touch with our team for any inquiries or support you may need.
            </p>
          </div>

          {/* Right Side - Contact Form */}
          <div className="w-full md:w-1/2 p-8">
            <h2 className="text-2xl font-bold mb-4">Get in Touch</h2>
            <Form method="post" className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  defaultValue={actionData?.fields?.name}
                  className={`mt-1 block w-full px-4 py-2 border ${
                    actionData?.fieldErrors?.name
                      ? "border-red-500"
                      : "border-gray-300"
                  } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                />
                {actionData?.fieldErrors?.name && (
                  <p className="mt-1 text-sm text-red-500">{actionData.fieldErrors.name}</p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  defaultValue={actionData?.fields?.email}
                  className={`mt-1 block w-full px-4 py-2 border ${
                    actionData?.fieldErrors?.email
                      ? "border-red-500"
                      : "border-gray-300"
                  } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                />
                {actionData?.fieldErrors?.email && (
                  <p className="mt-1 text-sm text-red-500">{actionData.fieldErrors.email}</p>
                )}
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  defaultValue={actionData?.fields?.message}
                  className={`mt-1 block w-full px-4 py-2 border ${
                    actionData?.fieldErrors?.message
                      ? "border-red-500"
                      : "border-gray-300"
                  } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                ></textarea>
                {actionData?.fieldErrors?.message && (
                  <p className="mt-1 text-sm text-red-500">{actionData.fieldErrors.message}</p>
                )}
              </div>

              {actionData?.formError && (
                <p className="text-sm text-red-500">{actionData.formError}</p>
              )}

              <div>
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-200"
                >
                  Send Message
                </button>
              </div>
            </Form>
          </div>
        </div>
      </div>
      <DropUpButton pageType="aboutUs" /> {/* Add the DropUpButton here */}
    </div>
    
  );
}
