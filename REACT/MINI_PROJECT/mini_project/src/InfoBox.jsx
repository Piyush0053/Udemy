import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import "./InfoBox.css";

export default function InfoBox({info}) {
  let IMAGE_URL =
    "https://images.unsplash.com/photo-1559215334-45971d3b42b0?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Y2xvdWR5JTIwd2VUSEVSfGVufDB8fDB8fHww";

  return (
    <div className="InfoBox">
      <div className="Weathercard">
      <Card sx={{ maxWidth: 345 }}>
        <CardMedia
          sx={{ height: 140 }}
          image={IMAGE_URL}
          title="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {info.city}
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: "text.secondary" }}
            component={"span"}
          >
            <p>Temperature={info.temp}&deg;C</p>
            <p>Humidity={info.humidity}</p>
            <p>The weather can be described as <i>{info.weather}</i> and feels like <i>weaty</i> </p>
          </Typography>
        </CardContent>
      </Card>
      </div>
    </div>
  );
}
