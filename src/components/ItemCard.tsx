import React, { useState } from "react";
import { Item } from "../utils/types";
import Button from "./button";
import EditModal from "./EditModal/EditModal";
import { PropertyStore } from "../../Zustand/PropertyStore";
import { ValueStore } from "../../Zustand/ValueStore";
import { ItemStore } from "../../Zustand/ItemStore";

const ItemCard = ({
  id,
  label,
  description,
  imgUrl,
  totalFiles,
  foundedDate,
}: Item) => {
  const [seeMore, setSeeMore] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const { selectedProperty } = PropertyStore();
  const { selectedValue } = ValueStore();
  const { removeEdittedItem, getSelectedItem, selectedItem } = ItemStore();
  const btnText = seeMore ? "See Less" : "See More ";

  const handleMoreContent = () => {
    setSeeMore(!seeMore);
  };
  const openEditModal = (id: string) => {
    alert(id);

    setShowModal(!showModal);
    getSelectedItem(id);
  };
  const handleEdit = () => {
    alert(selectedProperty + selectedValue);
    setShowModal(!showModal);
    const id = selectedItem.id;
    const classifiedItem = {
      ...selectedItem,
      value: selectedValue,
      property: selectedProperty,
    };
    console.log("classified item", classifiedItem);

    //handle post request
    removeEdittedItem(id);
  };

  return (
    <div className="px-3 mb-10">
      <div className="flex flex-col gap-4 w-full group-[]: ">
        <h1 className="text-gray-900 text-[1.20rem] capitalize group-hover:bg-opacity-85 p-2.5 border-b-[1px] border-gray-400">
          {label}
        </h1>
        <p className="text-base italic max-w-xl">{description}</p>
        <div className="flex flex-col gap-3">
          {/* item image */}
          <div className="flex items-end gap-5 md:gap-8">
            <img
              className="w-24 h-24 md:w-28 md:h-28 object-cover rounded-xl"
              src={imgUrl}
              alt={label}
            />
            <div className="w-fit">
              <Button
                label="Edit"
                border={true}
                icon={true}
                onClick={(id) => openEditModal(id)}
              />
            </div>
          </div>
          <div className="w-fit">
            <Button label={btnText} onClick={handleMoreContent} />
          </div>
        </div>

        {/* collapse content (more item props) */}
        {seeMore && (
          <div>
            <p>Total Files: {totalFiles}</p>
            <p>Founded Date: {foundedDate}</p>
          </div>
        )}

        {/* modal content */}
        {showModal && (
          <EditModal
            handleClose={() => setShowModal(!showModal)}
            handleEdit={handleEdit}
          />
        )}
      </div>
    </div>
  );
};

export default ItemCard;
