import { Request } from "express";

type RequestWithParams<T> = Request<T>;
type RequestWithBody<B> = Request<{}, {}, B>;
type RequestWithParamsAndBody<P, B> = Request<P, {}, B>;

export type { RequestWithParams, RequestWithBody, RequestWithParamsAndBody };
