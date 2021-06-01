import React from "react";
import { ReactComponent as StarFilled } from "../../images/common/star.svg";
import { ReactComponent as StarEmpty } from "../../images/common/starEmpty.svg";
import { Tooltip } from "@material-ui/core";
import { getResourceValueByKey } from "../../utils/resourceHelper";
import { updateFavourite } from "../../utils/getData";
import { useSnackbar } from "notistack";
import { renderSnackbar } from "../../utils";
import { useMutation } from "react-query";

const UpdateFavouriteContainer = (props) => {
  const {
    resource,
    favourite,
    projectId,
    refetchProjectSummary,
    disableUpdate,
  } = props;

  const { enqueueSnackbar } = useSnackbar();

  const [updateFavouriteMutation] = useMutation(updateFavourite, {
    onSuccess: (response) => {
      renderSnackbar(enqueueSnackbar, response);
      refetchProjectSummary();
    },
  });

  const onFavouriteIconClick = (e) => {
    enqueueSnackbar(
      getResourceValueByKey(resource, "UPDATING...", "Updating..."),
      { variant: "success" }
    );
    e.preventDefault();
    e.stopPropagation();
    updateFavouriteMutation({
      projectId: projectId,
      markedAsFavourite: favourite === true ? false : true,
    });
  };

  const renderFavStarIcons = () => (favourite ? <StarFilled /> : <StarEmpty />);

  const renderEditableFavStarIcons = () => (
    <Tooltip
      title={
        favourite
          ? getResourceValueByKey(
              resource,
              "REMOVE_FROM_FAVOURITES",
              "Remove from Favourites"
            )
          : getResourceValueByKey(
              resource,
              "MARK_AS_FAVOURITE",
              "Mark as Favourite"
            )
      }
    >
      {favourite ? (
        <StarFilled onClick={onFavouriteIconClick} />
      ) : (
        <StarEmpty onClick={onFavouriteIconClick} />
      )}
    </Tooltip>
  );

  return disableUpdate ? renderFavStarIcons() : renderEditableFavStarIcons();
};

export default UpdateFavouriteContainer;
