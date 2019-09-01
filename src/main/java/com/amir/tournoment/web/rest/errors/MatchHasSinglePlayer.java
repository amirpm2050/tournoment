package com.amir.tournoment.web.rest.errors;

public class MatchHasSinglePlayer extends BadRequestAlertException{
    private static final long serialVersionUID = 1L;

    public MatchHasSinglePlayer() {
        super(null, "Match dosn't support two player  ", "matchEntity", "matchIsfull ");
    }
}
