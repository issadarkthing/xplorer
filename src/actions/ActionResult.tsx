type ActionOK<T> = {
    status: "OK";
    data: T;
};

type ActionERR = {
    status: "ERR";
    error: {
        message: string;
    };
};

export type ActionResult<T> = ActionOK<T> | ActionERR;
