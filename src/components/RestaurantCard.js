import React, {useEffect} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import CardMedia from "@material-ui/core/CardMedia";
import Avatar from "@material-ui/core/Avatar";
import useResources from "./useResources";
import Star from '@material-ui/icons/Star';
import StarBorder from '@material-ui/icons/StarBorder';
import StarHalf from '@material-ui/icons/StarHalf';
import AttachMoney from '@material-ui/icons/AttachMoney';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 300,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

const RestaurantCard = (props) => {
    const classes = useStyles()
    const [expanded, setExpanded] = React.useState(false)
    const handleExpandClick = () => {
        setExpanded(!expanded)
    };
    const [photoList, setPhotoList] = React.useState([])
    const {restaurant} = props;

    if (restaurant.attributes == null) {
        restaurant.attributes = {};
    }
    useEffect(
        () => {
          useResources('final_photos.json').then(r => setPhotoList(r));
        }, []);

    const stars = [];
    for(let i = 1 ; i <= 5 ; i++) {
        if (i <= restaurant.stars) {
            stars.push(<Star style={{fontSize: 14, color: '#cc0'}}/>);
        } else if (i <= restaurant.stars + 0.5) {
            stars.push(<StarHalf style={{fontSize: 14, color: '#cc0'}} />);
        } else {
            stars.push(<StarBorder style={{fontSize: 14, color: '#cc0'}} />);
        }
    }
    const dollarSign = [];
    for (let i = 0; i < restaurant.attributes.RestaurantsPriceRange2; i++) {
        dollarSign.push(<AttachMoney style ={{fontSize: 14, color: '#cc0'}} />)
    }

    return (
        <Card className={classes.root}>
        <CardHeader
        avatar={
          <div>

            {
              (() => {
                if (photoList[restaurant.business_id] == null) {
                  return <img src={`/notfound.png`} width={100} height={80} />
                }else {
                  return <img src={`https://s3-media0.fl.yelpcdn.com/bphoto/${photoList[restaurant.business_id]}/o.jpg`} width={100} height={80} />
                }
              } )()
            }
          </div>
        }
        title={<div>{
            restaurant.attributes.RestaurantsPriceRange2 != null
                ? dollarSign
                : ''
        } {restaurant.name}</div>}
        subheader={<div>{stars}{restaurant.stars} stars - {restaurant.review_count} reviews </div>}
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p" style={{fontSize : 12}}>
          {`${restaurant.cuisine} - ${restaurant.address}`}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent >
          <Typography variant="body2" color="textSecondary" component="p">{restaurant.categories}</Typography>
            <Typography variant="body2" color="textSecondary" component="p">
                Open Hours:
                {
                    restaurant.hours != null
                        ? Object.entries(restaurant.hours).map(hour => <li key={hour[0]}>{hour[0]}: {hour[1]}</li>)
                        : "n/a"
                }
            </Typography>
        </CardContent>
      </Collapse>
    </Card>)
}

export default RestaurantCard

