import { createAction } from "@reduxjs/toolkit";

export const apiCallBegan = createAction('api/CallBegan')
export const apiCallSucceeded = createAction('api/CallSucceeded')
export const apiCallFailed = createAction('api/CallFailed')