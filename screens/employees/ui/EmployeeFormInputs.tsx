"use client";
import React from 'react';
import FormInput from '../../../shared/ui/FormInput';
import { useEmployeeStore } from '@/models/employee/store';
import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { EmployeeFormValues } from '../hooks/useEmployeeForm';
import { motion, AnimatePresence } from 'framer-motion';

type Props = {
  register: UseFormRegister<EmployeeFormValues>;
  errors: FieldErrors<EmployeeFormValues>;
};

export default function EmployeeFormInputs({ register, errors }: Props) {
  const { activeModal } = useEmployeeStore();

  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.08 } },
    exit: { opacity: 0, transition: { staggerChildren: 0.05, staggerDirection: -1 } },
  };
  const fieldVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  return (
    <AnimatePresence mode="wait">
      {activeModal && (
        <motion.div
          key="employee-form"
          variants={containerVariants}
          initial="hidden"
          animate="show"
          exit="exit"
          className="grid p-5 grid-cols-2 gap-5"
        >
          {/* First Name */}
          <motion.div variants={fieldVariants}>
            <FormInput
              label="First Name"
              capitalize
              placeholder="Samuel"
              {...register("firstName", { required: "First name is required" })}
              error={errors.firstName?.message}
            />
          </motion.div>
          {/* Last Name */}
          <motion.div variants={fieldVariants}>
            <FormInput
              label="Last Name"
              capitalize
              placeholder="Johnson"
              {...register("lastName", { required: "Last name is required" })}
              error={errors.lastName?.message}
            />
          </motion.div>

          {/* Email */}
          <motion.div variants={fieldVariants} className="col-span-2">
            <FormInput
              label="Email Address"
              placeholder="samuel@example.com"
              autoComplete="off"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email address",
                },
              })}
              error={errors.email?.message}
            />
          </motion.div>

          {/* Phone Number */}
          <motion.div variants={fieldVariants}>
            <FormInput
              label="Phone Number"
              placeholder="09012345678"
              {...register("phoneNumber", {
                required: "Phone number is required",
                pattern: {
                  value: /^[0-9]{10,15}$/,
                  message: "Invalid phone number",
                },
              })}
              error={errors.phoneNumber?.message}
            />
          </motion.div>

          {/* Gender */}
          <motion.div variants={fieldVariants}>
            <FormInput
              label="Gender"
              options={[
                { label: "Male", value: "MALE" },
                { label: "Female", value: "FEMALE" },
              ]}
              {...register("gender", { required: "Gender is required" })}
              error={errors.gender?.message}
            />
          </motion.div>
          {/* Role */}
          <motion.div variants={fieldVariants} className='col-span-2'>
            <FormInput
              
              label="Role"
              options={[
                { label: "Waiter", value: "ROLE_WAITER" },
                { label: "Chef", value: "ROLE_CHEF" },
                { label: "Cashier", value: "ROLE_CASHIER" },
                { label: "Manager", value: "ROLE_MANAGER" },
              ]}
              {...register("role", { required: "Role is required" })}
              error={errors.role?.message}
            />
          </motion.div>

        </motion.div>
      )}
    </AnimatePresence>
  );
}
