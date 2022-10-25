/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React, { lazy } from 'react';
import Label from '../components/Form/Label';
import { FORM_FIELD_TYPE } from '../constants/FormFieldType';
import { Form } from 'react-bootstrap';
import ListConnectedChannel from '../components/ListConnectedChannel';
import ListConnectedChannelModal from '../components/ListConnectedChannelModal';
import FormAgeField from '../components/Form/FormAgeField';
import FormLocationField from '../components/Form/FormLocationField';

const FormDateRangePicker = lazy(() => import('../components/Form/FormDateRangePicker'));
const CustomizedDatePicker = lazy(() => import('../components/DatePicker'));
const FormImage = lazy(() => import('../components/Form/FormImage'));
const FormSelection = lazy(() => import('../components/Form/FormSelection'));
const FormSelectionPersona = lazy(() => import('../components/Form/FormSelectionPersona'));
const FormInformation = lazy(() => import('../components/FormInformation'));
const FormTab = lazy(() => import('../components/Form/FormTab'));
const FormSelectDropdown = lazy(() => import('../components/Form/FormSelectDropdown'));
const ComponentDamAssets = lazy(() => import('../components/ComponentDamAssets'));
const FormPriceField = lazy(() => import('../components/Form/FormPriceField'));
const FormRadio = lazy(() => import('../components/Form/FormRadio'));

const Input = lazy(() => import('../components/Form/Input'));

const ContentFormDescription = lazy(() =>
  import('../containers/ContentPage/ContentForm/ContentFormDescription')
);

const CanvaButton = lazy(() => import('../components/CanvaButton'));

const renderingGroupFieldHandler = (group, validator) => {
  return Object.keys(group.fields)
    .map((fieldIndex) => {
      return [...Array(group.fields[fieldIndex])].map((field) => {
        return (() => {
          let className = field.className ? field.className : '';
          switch (field.type) {
            case FORM_FIELD_TYPE.INPUT:
              return (
                <Form.Group key={field.key} className={`mb-3 ${className}`}>
                  <Label text={field.label} required={field.required ?? false} />
                  <Input field={field} />
                  {field.validation &&
                    validator.message(field.label, field.value, field.validation, {
                      className: 'text-danger',
                    })}
                </Form.Group>
              );
            case FORM_FIELD_TYPE.TEXTAREA:
              return (
                <Form.Group key={field.key} className={`mb-3 ${className}`}>
                  <Label text={field.label} required={field.required ?? false} />
                  <Form.Control
                    as="textarea"
                    defaultValue={field.value}
                    required={field.required ?? false}
                    id={field.key}
                    onChange={field.changed ?? undefined}
                    onBlur={field.blurred ?? undefined}
                  />

                  {field.validation &&
                    validator.message(field.label, field.value, field.validation, {
                      className: 'text-danger',
                    })}
                </Form.Group>
              );

            case FORM_FIELD_TYPE.DATERANGE:
              return (
                <FormDateRangePicker
                  key={Math.random(40, 200)}
                  field={field}
                  validator={validator}
                />
              );
            case FORM_FIELD_TYPE.IMAGE:
              return (
                <Form.Group key={Math.random(40, 200)} className={`mb-3 ${className}`}>
                  <Label text={field.label} required={field.required ?? false} />

                  <FormImage key={Math.random(40, 200)} field={field} />
                </Form.Group>
              );

            case FORM_FIELD_TYPE.SELECTION:
              return (
                <Form.Group key={Math.random(40, 200)} className={`mb-3 ${className}`}>
                  {field.label && <Label text={field.label} required={field.required ?? false} />}

                  <FormSelection key={Math.random(40, 200)} field={field} />

                  {field.validation &&
                    validator.message(field.label, field.value, field.validation, {
                      className: 'text-danger',
                    })}
                </Form.Group>
              );
            case FORM_FIELD_TYPE.SELECTIONPERSONA:
              return (
                <Form.Group key={Math.random(40, 200)} className={`mb-3 ${className}`}>
                  <Label text={field.label} required={field.required ?? false} />

                  <FormSelectionPersona key={Math.random(40, 200)} field={field} />

                  {field.validation &&
                    validator.message(field.label, field.value, field.validation, {
                      className: 'text-danger',
                    })}
                </Form.Group>
              );

            case FORM_FIELD_TYPE.TAB:
              return (
                <Form.Group key={Math.random(40, 200)} className={`mb-3 ${className}`}>
                  <FormTab key={Math.random(40, 200)} field={field} validator={validator} />
                </Form.Group>
              );
            case FORM_FIELD_TYPE.DROPDOWN:
              return (
                <Form.Group key={Math.random(40, 200)} className={`mb-3 ${className}`}>
                  {field.label && <Label text={field.label} required={field.required ?? false} />}
                  <FormSelectDropdown field={field} />
                  {field.validation &&
                    validator.message(field.label, field.value, field.validation, {
                      className: 'text-danger',
                    })}
                </Form.Group>
              );
            case FORM_FIELD_TYPE.RADIO:
              return (
                <Form.Group key={Math.random(40, 200)} className={`mb-3 ${className}`}>
                  <Label text={field.label} required={field.required ?? false} />
                  <FormRadio field={field} />
                </Form.Group>
              );

            case FORM_FIELD_TYPE.CANVA:
              return (
                <Form.Group key={Math.random(40, 200)} className={`${className}`}>
                  {field.label && <Label text={field.label} required={field.required ?? false} />}

                  <CanvaButton key={Math.random(40, 200)} field={field} />
                  {field.validation &&
                    validator.message(field.label, field.value, field.validation, {
                      className: 'text-danger',
                    })}
                </Form.Group>
              );
            case FORM_FIELD_TYPE.DAM:
              return (
                <Form.Group key={FORM_FIELD_TYPE.DAM} className={`${className}`}>
                  {field.label && <Label text={field.label} required={field.required ?? false} />}

                  {/* <DamButton key={Math.random(40, 200)} field={field} /> */}
                  <ComponentDamAssets field={field} formPropsData={field.formPropsData} />
                  {field.validation &&
                    validator.message(field.label, field.value, field.validation, {
                      className: 'text-danger',
                    })}
                </Form.Group>
              );
            case FORM_FIELD_TYPE.LABELCARD:
              return (
                <Form.Group key={Math.random(40, 200)} className={`mb-3 ${className}`}>
                  <Label text={field.label} required={field.required ?? false} />
                  <ListConnectedChannel field={field} />
                </Form.Group>
              );

            case FORM_FIELD_TYPE.INFORMATION:
              return (
                <Form.Group key={Math.random(40, 200)} className={`mb-3 ${className}`}>
                  <Label text={field.label} required={field.required ?? false} />
                  <FormInformation field={field} />
                </Form.Group>
              );
            case FORM_FIELD_TYPE.LABELBTN:
              return (
                <Form.Group key={Math.random(40, 200)} className={`mb-3 ${className}`}>
                  <ListConnectedChannelModal field={field} />
                </Form.Group>
              );
            case FORM_FIELD_TYPE.DESCRIPTION:
              return (
                <Form.Group key={field.key} className={`${className}`}>
                  <ContentFormDescription field={field} />
                  {field.validation &&
                    validator.message(field.label, field.value, field.validation, {
                      className: 'text-danger',
                    })}
                </Form.Group>
              );
            case FORM_FIELD_TYPE.BIRTHDAY:
              return (
                <Form.Group key={Math.random(40, 200)} className={`mb-3 ${className}`}>
                  <Label text={field.label} />
                  <div className="form-control w-full">
                    <CustomizedDatePicker
                      handleOnChange={(date) => field.changed(date)}
                      defaultDate={field.value ? field.value.split(' ')[0] : null}
                    />
                  </div>
                </Form.Group>
              );

            case FORM_FIELD_TYPE.PRICE:
              return (
                <Form.Group key={field.key} className={`mb-3 ${className}`}>
                  <Label text={field.label} required={field.required ?? false} />

                  <FormPriceField key={field.key} field={field} validator={validator} />

                  {field.validation &&
                    validator.message(field.label, field.value, field.validation, {
                      className: 'text-danger',
                    })}
                </Form.Group>
              );

            case FORM_FIELD_TYPE.AGE:
              return (
                <Form.Group key={Math.random(40, 200)} className={`mb-3 ${className}`}>
                  <Label text={field.label} required={field.required ?? false} />
                  <FormAgeField field={field} />
                  {field.validation &&
                    validator.message(field.label, field.valueFrom, field.validation, {
                      className: 'text-danger',
                    })}
                </Form.Group>
              );

            case FORM_FIELD_TYPE.LOCATION:
              return (
                <Form.Group key={Math.random(40, 200)} className={`mb-3 ${className}`}>
                  <Label text={field.label} required={field.required ?? false} />
                  <FormLocationField field={field} validator={validator} />
                </Form.Group>
              );

            default:
              return null;
          }
        })();
      });
    })
    .reduce((arr, el) => {
      return arr.concat(el);
    }, []);
};

export { renderingGroupFieldHandler };
