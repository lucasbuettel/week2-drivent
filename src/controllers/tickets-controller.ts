import { AuthenticatedRequest } from "@/middlewares";
import ticketServices from "@/services/tickets-service";
import { Request, Response } from "express";
import httpStatus from "http-status";

export async function getTicketTypes(req: Request, res: Response) {
  try {
    const ticketTypes = await ticketServices.getAllTicketTypes();
    res.status(httpStatus.OK).send(ticketTypes);
  } catch (error) {
    res.sendStatus(500);
  }
}

export async function getTicket(req: AuthenticatedRequest, res: Response) {
  const { userId }  = req;

  try {
    const ticket = await ticketServices.getTicket(Number(userId));
    res.send(ticket);
  } catch (error) {
    if (error.name === "NotFoundError") {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
    res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}

export async function postTicket(req: AuthenticatedRequest, res: Response) {
  const body = req.body;
  const { userId } = req;
  try {
    const ticket = await ticketServices.insertTicket(body, Number(userId));
    res.status(httpStatus.OK).send(ticket);
  } catch (error) {
    if (error.name === "NotFoundError") {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
  }
}
