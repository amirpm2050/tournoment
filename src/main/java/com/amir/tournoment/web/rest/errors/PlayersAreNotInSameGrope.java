package com.amir.tournoment.web.rest.errors;

public class PlayersAreNotInSameGrope extends BadRequestAlertException {

    private static final long serialVersionUID = 1L;

    public PlayersAreNotInSameGrope() {
        super(null , "Selected Players  are not in same groupe ", "playerEntity", "opponent Cant Be teammates");
    }
}
