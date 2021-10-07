import React from 'react'; 
import { render } from "@testing-library/react";
import Appointment from "components/Appointment/index";
import Application from "components/Application";

describe('Appointment', () => {
  it('renders without crashing', () => {
    render(<Appointment />)
  })
})