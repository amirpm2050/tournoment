package com.amir.tournoment.web.rest.errors;

import java.net.URI;

public class TeamEntityIsFullException extends BadRequestAlertException {

    private static final long serialVersionUID = 1L;

    public TeamEntityIsFullException() {
        super(null, "Selected Team is Full of bodies ! ", "playerEntity", "team is full ");
    }
}
