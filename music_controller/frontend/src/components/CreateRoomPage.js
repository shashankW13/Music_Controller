import React, { Component } from "react"
import Button from "@material-ui/core/Button"
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import TextField from "@material-ui/core/TextField"
import FormHelperText from "@material-ui/core/FormHelperText"
import FormControl from "@material-ui/core/FormControl"
import { Link } from "react-router-dom"
import Radio from "@material-ui/core/Radio"
import RadioGroup from "@material-ui/core/RadioGroup"
import FormControlLabel from "@material-ui/core/FormControlLabel"

export default class CreateRoomPage extends Component {
  default_votes = 2

  constructor(props) {
    super(props)
    this.state = {
      guest_can_pause: true,
      votes_to_skip: this.default_votes,
    }
    this.handleRoomButtonPressed = this.handleRoomButtonPressed.bind(this)
    // this.handleVotesChange = this.handleVotesChange.bind(this)
    // this.handleGuestCanPauseChange = this.handleGuestCanPauseChange(this)
  }

  handleVotesChange = (event) => {
    const votesValue = event.target.value
    this.setState({
      votes_to_skip: parseInt(votesValue),
    })
  }

  handleGuestCanPauseChange = (event) => {
    const guestControlValue = event.target.value
    this.setState({
      guest_can_pause: guestControlValue === "true" ? true : false,
    })
  }

  handleRoomButtonPressed() {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        votes_to_skip: this.state.votes_to_skip,
        guest_can_pause: this.state.guest_can_pause,
      }),
    }

    fetch("/api/create-room", requestOptions)
      .then((response) => response.json())
      .then((data) => console.log(data))
  }
  render() {
    return (
      <Grid container spacing={1}>
        <Grid item xs={12} align="center">
          <Typography component="h4" variant="h4">
            Create Room
          </Typography>
        </Grid>

        <Grid item xs={12} align="center">
          <FormControl component="fieldset">
            <FormHelperText component={"div"}>
              <div align="center">Guest Control of Playback state</div>
            </FormHelperText>
            <RadioGroup
              row
              defaultValue="true"
              onChange={this.handleGuestCanPauseChange}
            >
              <FormControlLabel
                value="true"
                control={<Radio color="primary" />}
                label="Play/Pause"
                labelPlacement="bottom"
              />

              <FormControlLabel
                value="false"
                control={<Radio color="secondary" />}
                label="No Control"
                labelPlacement="bottom"
              />
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid item xs={12} align="center">
          <FormControl>
            <TextField
              required={true}
              type="number"
              defaultValue={this.default_votes}
              inputProps={{
                min: 1,
                style: { textAlign: "center" },
              }}
              onChange={this.handleVotesChange}
            />
            <FormHelperText component={"div"}>
              <div align="center">Votes allowed to skip song</div>
            </FormHelperText>
          </FormControl>
        </Grid>

        <Grid item xs={12} align="center">
          <Button
            color="primary"
            variant="contained"
            onClick={this.handleRoomButtonPressed}
          >
            Create A Room
          </Button>
        </Grid>
        <Grid item xs={12} align="center">
          <Button color="secondary" variant="contained" to="/" component={Link}>
            Back
          </Button>
        </Grid>
      </Grid>
    )
  }
}
